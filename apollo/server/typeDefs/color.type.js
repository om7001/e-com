import { gql } from 'apollo-server-express';

const colors = gql`
  type color {
    _id: ID
    name: String
    hexCode: String
  }

  input addColorInput {
    name: String
    hexCode: String
  }

  type Query{
    getAllColor:[color]
  }

  type Mutation{
    addColor(input: addColorInput):color
  }
`
export default colors