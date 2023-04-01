import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
    listarProducto,
    listarProductoPorId,
    grabarProducto,
    actualizarProducto,
    eliminarProducto,
} from '../../controllers/controllers/productsGraphqlController.js'

const schema = buildSchema(`

  input IdInput {
    _id: ID!
  }

  input ProductoInput {
    title: String
    price: Int
    thumbnail: String
  }

  type Producto {
    _id: ID!
    title: String!
    price: Int!
    thumbnail: String!
  }

  type Query {
    listarProductoPorId(_id: ID!): Producto,
    listarProducto: [Producto]
  }
  
  type Mutation {
    grabarProducto(datos: ProductoInput!): Producto,
    actualizarProducto(_id: ID!, datos: ProductoInput!): Producto
    eliminarProducto(_id: IdInput): Producto
  }

`)


export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    listarProducto,
    listarProductoPorId,
    grabarProducto,
    actualizarProducto,
    eliminarProducto,
  },
  graphiql: true,
})


/*queries ej.:
  "query": "query { listarProducto {_id, title, price, thumbnail} } "
  "query": "query { listarProductoPorId(_id: \"5254306a-af1f-4b12-94b7-70bbe0e97ca3\") {_id, title, price, thumbnail} } "
  "query": "mutation { grabarProducto(datos: {title: \"productograph\", price: 2000, thumbnail: \"imagen\"}) {_id, title, price, thumbnail} } "
  "query": "mutation { actualizarProducto(_id: \"567eae58-f012-45cc-a2e9-04349face639\", datos: {title: \"productograph\", price: 2000, thumbnail: \"imagen\"}) {_id, title, price, thumbnail} } "
  "query": "mutation { eliminarProducto(_id: {_id: \"4ffce52e-c6dc-49aa-9349-11d41211b8b1\"}) {_id, title, price, thumbnail} } "
}*/
