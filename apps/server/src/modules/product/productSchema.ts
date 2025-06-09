import gql from 'graphql-tag';

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String
    description: String
    unit: String!
    createdAt: String
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!
  }

  type Mutation {
    createProduct(name: String!, sku: String, description: String, unit: String!): Product
    updateProduct(id: ID!, name: String, sku: String, description: String, unit: String): Product
    deleteProduct(id: ID!): Product
  }
`;
