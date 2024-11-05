
export const DIRECTIONS = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
} as const

type Position = {
  x: number
  y: number
}

export type Emitter = {
  type: 'emitter'
  position: Position
  direction: number
}

export type Detector = {
  type: 'detector'
  position: Position
}

export type Cube = {
  type: 'cube'
  position: Position
}

export type Triangle = {
  type: 'triangle'
  position: Position
}

export type Mirror = {
  type: 'mirror'
  position: Position
  rotation: number
}

export type Splitter = {
  type: 'splitter'
  position: Position
  rotation: number
}

export type Glass = {
  type: 'glass'
  position: Position
}

export type Photon = {
  type: 'photon'
  position: Position
  direction: number
  phase: number
  probability: number
  id: string
}

export type Entity = Emitter | Detector | Cube | Triangle | Mirror | Splitter | Glass | Photon

export type Game = {
  entities: Entity[]
  width: number
  height: number
  time: number
}

export function update(game: Game): Game {
  game = splitPhotons(game)
  game = reflectPhotons(game)
  // TODO: detection doesn't work
  game = detectPhotons(game)
  game = movePhotons(game)
  game = deleteOutOfBoundsPhotons(game)
  game = addNewPhotons(game)
  game.time++

  return game
}

function addNewPhotons(game: Game): Game {
  if (game.time % 3 !== 0) return game
  const emitters = game.entities.filter(entity => entity.type === 'emitter') as Emitter[]
  const photons = emitters.flatMap(emitter => emit(emitter))
  game.entities.push(...photons)
  return game;
}

function emit(emitter: Emitter): Photon {
  const photon: Photon = {
    type: 'photon',
    position: emitter.position,
    direction: emitter.direction,
    phase: 1,
    probability: 1,
    id: `${Math.random()}:`
  }
  return photon
}

function movePhotons(game: Game): Game {
  const photons = game.entities.filter(entity => entity.type === 'photon').map(photon => move(photon))
  const entities = [...game.entities.filter(entity => entity.type !== 'photon'), ...photons]

  return { ...game, entities }
}

function move<T extends { position: Position, direction: number }>(entity: T): T {
  const newPosition = { ...entity.position }
  switch (entity.direction) {
    case DIRECTIONS.up:
      newPosition.y--
      break
    case DIRECTIONS.right:
      newPosition.x++
      break
    case DIRECTIONS.down:
      newPosition.y++
      break
    case DIRECTIONS.left:
      newPosition.x--
      break
  }

  return {
    ...entity,
    position: newPosition
  }
}


function deleteOutOfBoundsPhotons(game: Game): Game {
  const entities = game.entities.filter(entity => !(entity.type === 'photon' && isOutOfBounds(game, entity)))
  return { ...game, entities }
}

function isOutOfBounds(game: Game, entity: Photon): boolean {
  return entity.position.x < -1 || entity.position.x > game.width || entity.position.y < -1 || entity.position.y > game.height
}


type EnitityMap = {
  [K in Entity['type']]: Extract<Entity, { type: K }>
}


function overlaps<T extends Entity["type"]>(game: Game, entity: Entity, type: T) {
  return game.entities.find<EnitityMap[T]>(e => e.position.x === entity.position.x && e.position.y === entity.position.y && e.type === type)
}

function reflectPhotons(game: Game) {
  const entities = game.entities.flatMap(entity => {
    if (entity.type === 'photon') {
      const mirror = overlaps(game, entity, 'mirror')
      if (mirror) {
        return reflect(entity, mirror)
      }
    }
    return entity
  })
  return { ...game, entities }
}

function splitPhotons(game: Game) {
  const entities = game.entities.flatMap(entity => {
    if (entity.type === 'photon') {
      const splitter = overlaps(game, entity, 'splitter')
      if (splitter) {
        return split(entity, splitter)
      }
    }
    return entity
  })
  return { ...game, entities }
}

export function split<T extends { rotation: number }>(photon: Photon, splitter: T): Photon[] {
  const newPhotons = reflect(photon, splitter)
  if (newPhotons.length === 0) {
    return []
  }

  const [reflectedPhoton] = newPhotons;

  reflectedPhoton.probability = photon.probability / 2
  reflectedPhoton.phase = photon.phase + 0.25
  reflectedPhoton.id += "R"

  const newPhoton = {
    ...photon,
    probability: photon.probability / 2,
    id: photon.id + "N"
  }

  return [reflectedPhoton, newPhoton]
}

export function reflect<T extends { rotation: number }>(photon: Photon, mirror: T): Photon[] {
  //transitions[rotation][direction] = new direction | absorption
  const transitions = [
    [null, 3, null, 1],
    [1, 0, 3, 2],
    [2, null, 0, null],
    [3, 2, 1, 0]
  ]

  const newDirection = transitions[mirror.rotation % 4][photon.direction]
  if (newDirection === null) {
    return []
  }

  const newPhoton = {
    ...photon,
    direction: newDirection,
  }

  return [newPhoton]
}

function choose<T extends { probability: number }>(arr: T[]): T {
  let random = Math.random()
  for (const item of arr) {
    random -= item.probability
    if (random <= 0) {
      return item
    }
  }
  return arr[arr.length - 1]
}


export function collapse(game: Game, id: string): Game {
  const [photons, entities] = partitionArray<Entity, Photon>(game.entities, entity => entity.type === 'photon' && entity.id.startsWith(id + ":"))
  const photon = choose(photons)

  photon.probability = 1
  photon.id = `${id}:`
  entities.push(photon)
  return { ...game, entities }
}

function detectPhotons(game: Game) {
  const [photons, entities] = partitionArray<Entity, Photon, Entity>(game.entities, entity => entity.type === 'photon')
  const [detectors, rest] = partitionArray<Entity, Detector>(entities, entity => entity.type === 'detector')
  const detectedPhotons = photons.filter(photon => detectors.some(detector => detector.position.x === photon.position.x && detector.position.y === photon.position.y))
  const detectedIds = detectedPhotons.map(photon => photon.id.split(":")[0])
  return detectedIds.reduce((acc, id) => collapse(acc, id), game)
}

function partitionArray<T, S extends T = T, U extends T = T>(arr: T[], conditionFn: (element: T) => boolean) {
  return arr.reduce(
    (result, item) => {
      if (conditionFn(item)) {
        result[0].push(item as S);
      } else {
        result[1].push(item as U);
      }
      return result;
    },
    [[], []] as [S[], U[]]
  );
}
