import gql from 'graphql-tag';

export const movementTypeDefs = gql`
  type Movement {
    id: ID!
    productId: ID!
    locationId: ID!
    userId: ID!
    type: String!
    quantity: Float!
    timestamp: String
    notes: String
    productName: String
    locationName: String
    userName: String
  }

  type Query {
    movement(id: ID!): Movement
    movements: [Movement!]!
    movementsByProduct(productId: ID!): [Movement!]!
    movementsByLocation(locationId: ID!): [Movement!]!
  }

  type Mutation {
    createMovement(
      productId: ID!
      locationId: ID!
      userId: ID!
      type: String!
      quantity: Float!
      notes: String
    ): Movement
    deleteMovement(id: ID!): Movement
  }
`;
