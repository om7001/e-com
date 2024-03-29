import { gql } from 'apollo-server-express';

const categorys = gql`
  type category {
    _id: ID
    name: String
  }

  type Query{
    getAllCategory:[category]
  }

  type Mutation{
    addCategory(name: String):category
    updateCategory(_id: ID!, name: String!): category
    deleteCategory(_id: ID!): String
  }
`
export default categorys