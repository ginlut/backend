const { buildSchema } = require("graphql");

const productSchema = buildSchema(`
    input ProductInput {
        nombre: String,
        foto: String,
        precio: Int,
    }

    type Producto {
        id: ID!,
        nombre: String,
        foto: String,
        precio: Int,
    }

    type Query {
        getById(id: ID!): Producto,
        getAll(campo: String, valor: String): [Producto],
    }

    type Mutation {
      createProduct(datos: ProductInput): Producto,
      updateProducts(id: ID!, datos: ProductInput): Producto,
      deleteById(id: ID!): Producto,
    }
`);

module.exports = productSchema;
