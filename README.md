# gatsby-source-pokedex

First gen pokedex source plugin

## Install

`npm i --save gatsby-source-pokedex`

## How to use
 
```js
// gatsby-config.js

module.exports = {
  plugins: [
    `gatsby-source-pokedex`
  ]
}
```

```graphql
query {
  allPokemon {
    nodes {
      number
      name
      type
      base {
        HP
        Attack
        Defense
        Sp__Attack
        Sp__Defense
        Speed
      }
      image {
        childImageSharp {
          fixed(width: 125, height: 125, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
}
```
