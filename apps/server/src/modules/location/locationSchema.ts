import gql from 'graphql-tag';

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    location(id: ID!): Location
    locations: [Location!]!
  }

  type Mutation {
    createLocation(name: String!, description: String): Location
    updateLocation(id: ID!, name: String, description: String): Location
    deleteLocation(id: ID!): Location
  }
`;
