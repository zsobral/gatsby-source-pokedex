const fs = require('fs-extra')
const path = require('path')

exports.sourceNodes = async function({
  actions,
  createNodeId,
  createContentDigest
}) {
  const { createNode } = actions
  const pokedex = await fs.readJson(
    path.resolve(__dirname, './data/pokedex.json')
  )

  const processPokemonImage = pokemon => {
    const { name, ext } = path.parse(pokemon.image)
    const absolutePath = path.resolve(__dirname, pokemon.image)
    const extension = ext.substring(1)
    const data = { name, ext, absolutePath, extension }

    return {
      ...data,
      id: createNodeId(`pokemon-image-${pokemon.id}`),
      children: [],
      internal: {
        type: 'PokemonImage',
        contentDigest: createContentDigest(data)
      }
    }
  }

  const processPokemon = pokemon => {
    const data = { ...pokemon, number: pokemon.id }
    delete data.id
    delete data.image

    return {
      ...data,
      id: createNodeId(`pokemon-info-${pokemon.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Pokemon',
        contentDigest: createContentDigest(data)
      }
    }
  }

  for (const pokemon of pokedex) {
    const pokemonNodeData = processPokemon(pokemon)
    const pokemonImageNodeData = processPokemonImage(pokemon)
    pokemonNodeData.image___NODE = pokemonImageNodeData.id

    createNode(pokemonImageNodeData)
    createNode(pokemonNodeData)
  }
}
