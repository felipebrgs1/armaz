import gql from 'graphql-tag';

export const inventoryTypeDefs = gql`
  type Inventory {
    productId: ID!
    locationId: ID!
    quantity: Float!
    productName: String
    locationName: String
  }

  type Query {
    inventory(productId: ID!, locationId: ID!): Inventory
    inventoryByProduct(productId: ID!): [Inventory!]!
    inventoryByLocation(locationId: ID!): [Inventory!]!
    allInventory: [Inventory!]!
  }

  type Mutation {
    updateInventory(productId: ID!, locationId: ID!, quantity: Float!): Inventory
    deleteInventory(productId: ID!, locationId: ID!): Inventory
  }
`;
