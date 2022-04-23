import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    # TODO: add saveBook parameters (look into input type)
    saveBook(): User
    removeBook(bookId: ID!)
  }

  type User
`;
