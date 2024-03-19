import { gql } from 'apollo-server';

const order = gql`
  type Order {
    _id: ID!
    products: [OrderProduct!]!
    user: User!
    total: Float!
  }

  type OrderProduct {
    pid: ID!
    qty: Int!
    color: color
  }

  input CreateOrderInput {
    products: [OrderProductInput!]!
    user: ID!
    total: Float!
  }

  input OrderProductInput {
    pid: ID!
    qty: Int!
    color: ID
  }

  type Query {
    getOrderByUserId(userId: ID!): Order
    getAllOrders: [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): String
  }
  
`;

export default order;