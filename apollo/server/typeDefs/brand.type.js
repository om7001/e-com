import { gql } from 'apollo-server-express';

const brands = gql`
  type brand {
    _id: ID
    name: String
  }

  type Query{
    getAllBrand:[brand]
  }

  type Mutation{
    addBrand(name: String):brand
    updateBrand(_id: ID!, name: String!): brand
    deleteBrand(_id: ID!): String
  }
`
export default brands