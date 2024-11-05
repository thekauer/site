import { describe, expect, test } from "vitest";
import { DIRECTIONS, type Splitter, type Photon, type Mirror, reflect, split } from "./game";

describe("Game", () => {
  describe("Split", () => {
    test("Photon is split", () => {
      const splitter: Splitter = {
        type: 'splitter',
        position: { x: 1, y: 1 },
        rotation: 1
      }

      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.right,
        phase: 0,
        probability: 1,
        id: '1'
      }

      const result = split(photon, splitter)

      expect(result).toEqual([
        {
          type: 'photon',
          position: { x: 1, y: 1 },
          direction: DIRECTIONS.up,
          phase: 0.25,
          probability: 0.5,
          id: '1R'
        },
        {
          type: 'photon',
          position: { x: 1, y: 1 },
          direction: DIRECTIONS.right,
          phase: 0,
          probability: 0.5,
          id: '1N'
        }
      ])

    })
  })

  describe("Mirror", () => {
    test("Photon hits side of mirror from above", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 0
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.down,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([])
    })

    test("Photon hits side of mirror from below", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 0
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.up,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([])
    })

    test("Photon hits side of mirror from left", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 2
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.left,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([])
    })

    test("Photon hits side of mirror from right", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 2
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.right,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([])
    })

    test("Photon reflected upwards", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 1
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.right,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([{
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.up,
        phase: 1,
        probability: 1,
        id: '1'
      }])
    })

    test("Photon reflected downwards", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 1
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.left,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([{
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.down,
        phase: 1,
        probability: 1,
        id: '1'
      }])
    })

    test("Photon reflected left", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 1
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.down,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([{
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.left,
        phase: 1,
        probability: 1,
        id: '1'
      }])
    })

    test("Photon reflected right", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 1
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.up,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([{
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.right,
        phase: 1,
        probability: 1,
        id: '1'
      }])
    })

    test("Photon reflected back to left", () => {
      const mirror: Mirror = {
        type: 'mirror',
        position: { x: 1, y: 1 },
        rotation: 0
      }
      const photon: Photon = {
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.right,
        phase: 1,
        probability: 1,
        id: '1'
      }

      const result = reflect(photon, mirror)
      expect(result).toEqual([{
        type: 'photon',
        position: { x: 1, y: 1 },
        direction: DIRECTIONS.left,
        phase: 1,
        probability: 1,
        id: '1'
      }])
    })

  })
})
