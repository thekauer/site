import { DIRECTIONS, type Entity } from "./game";

export const LEVEL: Entity[] = [
  {
    type: 'emitter',
    position: { x: 1, y: 1 },
    direction: DIRECTIONS.right
  },
  {
    type: 'splitter',
    position: { x: 3, y: 1 },
    rotation: 7
  },
  {
    type: 'mirror',
    position: { x: 3, y: 3 },
    rotation: 7
  },
  {
    type: 'mirror',
    position: { x: 5, y: 1 },
    rotation: 7
  },
  {
    type: 'splitter',
    position: { x: 5, y: 3 },
    rotation: 7
  },
  {
    type: 'splitter',
    position: { x: 7, y: 3 },
    rotation: 1
  },
  {
    type: 'mirror',
    position: { x: 3, y: 5 },
    rotation: 1
  },
  {
    type: 'splitter',
    position: { x: 5, y: 5 },
    rotation: 1
  },
  {
    type: 'splitter',
    position: { x: 7, y: 5 },
    rotation: 3
  },
  {
    type: 'mirror',
    position: { x: 9, y: 5 },
    rotation: 3
  },
  {
    type: 'triangle',
    position: { x: 1, y: 7 }
  },
  {
    type: 'splitter',
    position: { x: 3, y: 7 },
    rotation: 1
  },
  {
    type: 'mirror',
    position: { x: 5, y: 7 },
    rotation: 1
  },
  {
    type: 'mirror',
    position: { x: 7, y: 7 },
    rotation: 3
  },
  {
    type: 'splitter',
    position: { x: 9, y: 7 },
    rotation: 7
  },
  {
    type: 'triangle',
    position: { x: 11, y: 7 },
  },
  {
    type: 'cube',
    position: { x: 3, y: 9 }
  },
  {
    type: 'triangle',
    position: { x: 9, y: 9 }
  }
];

export const SOLUTION: Entity[] = [
  ...LEVEL,
  {
    type: 'detector',
    position: { x: 5, y: 2 }
  },
  {
    type: 'glass',
    position: { x: 5, y: 6 }
  },
  {
    type: 'cube',
    position: { x: 7, y: 6 }
  },
  {
    type: 'mirror',
    position: { x: 7, y: 1 },
    rotation: 2
  },
  {
    type: 'mirror',
    position: { x: 9, y: 3 },
    rotation: 0
  }
];

export const OBJECTS: Entity[] = [
  {
    type: 'emitter',
    position: { x: 0, y: 0, },
    direction: 1
  },
  {
    type: 'triangle',
    position: { x: 3, y: 3, }
  },
  {
    type: 'detector',
    position: { x: 6, y: 0, }
  },
  {
    type: 'mirror',
    position: { x: 9, y: 3, },
    rotation: 1
  },
  {
    type: 'splitter',
    position: { x: 12, y: 0, },
    rotation: 1
  },
  {
    type: 'cube',
    position: { x: 0, y: 3, }
  },
  {
    type: 'glass',
    position: { x: 3, y: 0, }
  },
  {
    type: 'photon',
    position: { x: 6, y: 3, },
    direction: 1
  }
];

