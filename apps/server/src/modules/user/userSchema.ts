import gql from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, passwordHash: String!): User
  }
`;
