const path = require('path')
const fs = require('fs-extra')

const loadPokedex = () =>
  fs.readJson(path.resolve(__dirname, '../data/pokedex.json'))

describe('pokedex', () => {
  test('pokemon image exists', async () => {
    const pokedex = await loadPokedex()
    for (const pokemon of pokedex) {
      const imagePath = await fs.exists(
        path.resolve(__dirname, '../', pokemon.image)
      )
      expect(imagePath).toBeTruthy()
    }
  })

  test('pokemon has all the required keys', async () => {
    const pokedex = await loadPokedex()
    for (const pokemon of pokedex) {
      expect(pokemon.id).toBeDefined()
      expect(pokemon.name).toBeDefined()
      expect(pokemon.type).toBeDefined()
      expect(pokemon.base).toBeDefined()
      expect(pokemon.base['HP']).toBeDefined()
      expect(pokemon.base['Attack']).toBeDefined()
      expect(pokemon.base['Defense']).toBeDefined()
      expect(pokemon.base['Sp. Attack']).toBeDefined()
      expect(pokemon.base['Sp. Defense']).toBeDefined()
      expect(pokemon.base['Speed']).toBeDefined()
      expect(pokemon.image).toBeDefined()

      expect(typeof pokemon.id).toBe('number')
      expect(typeof pokemon.name).toBe('string')
      expect(Array.isArray(pokemon.type)).toBe(true)
      expect(typeof pokemon.base).toBe('object')
      expect(typeof pokemon.base['HP']).toBe('number')
      expect(typeof pokemon.base['Attack']).toBe('number')
      expect(typeof pokemon.base['Defense']).toBe('number')
      expect(typeof pokemon.base['Sp. Attack']).toBe('number')
      expect(typeof pokemon.base['Sp. Defense']).toBe('number')
      expect(typeof pokemon.base['Speed']).toBe('number')
      expect(typeof pokemon.image).toBe('string')

      for (const type of pokemon.type) {
        expect(typeof type).toBe('string')
      }
    }
  })
})
