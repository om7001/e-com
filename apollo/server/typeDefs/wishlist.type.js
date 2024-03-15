import { gql } from 'apollo-server';

const wishlist = gql`
  type Wishlist {
    _id: ID!
    products: [product!]!
    user: User!
  }

  type Query {
    getWishlist: Wishlist
  }

  type Mutation {
    addToWishlist(userId: ID!, productId: ID!): Wishlist
    removeFromWishlist(userId: ID!, productId: ID!): Wishlist
  }
`;

export default wishlist;