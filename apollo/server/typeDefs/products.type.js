import { gql } from 'apollo-server-express';

const products = gql`
  type product {
    _id: ID
    name: String
    price: Float
    description: String
    stock: Int
    inStock: Boolean
    brand: brand
    category: category
    sku: String
    colors: [color]
    image:  [String]
    freeShipping: Boolean
  }

  # union colorUnion = ID | addColorInput

  input addProductInput {
    name: String
    price: Float
    description: String
    stock: Int
    inStock: Boolean
    brand: ID
    category: ID
    sku: String
    colors: [ID]
    image:  [String]
    freeShipping: Boolean
  }
  type Query{
    getAllProduct:[product],
    getProduct(_id: ID):product
  }

  type Mutation{
    addProducts(input: addProductInput):product
  }
`
export default products