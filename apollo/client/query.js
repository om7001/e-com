"use client"

import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProduct {
  getAllProduct {
    _id
    name
    price
    description
    stock
    inStock
    brand {
      _id
      name
    }
    category {
      _id
      name
    }
    sku
    colors {
      _id
      name
      hexCode
    }
    image
    freeShipping
   }
  }
`;

export const GET_PRODUCTS = gql`
query GetProduct($id: ID) {
  getProduct(_id: $id) {
    _id
    name
    price
    description
    stock
    inStock
    brand {
      _id
      name
    }
    category {
      _id
      name
    }
    sku
    colors {
      _id
      name
      hexCode
    }
    image
    freeShipping
  }
}
`

export const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
  getAllCategory {
    _id
    name
  }
}
`;

export const GET_ALL_BRAND = gql`
query GetAllBrand {
  getAllBrand {
    _id
    name
  }
}
`

export const GET_ALL_COLOR = gql`
query GetAllColor {
  getAllColor {
    _id
    name
    hexCode
  }
}
`