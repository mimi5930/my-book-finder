const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # User
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Book
  type Book {
    bookId: ID
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  # Auth
  type Auth {
    token: ID!
    user: User
  }

  # Queries
  type Query {
    me: User
  }

  # Create input type for saveBook
  input bookContent {
    bookId: ID
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  # Mutations
  type Mutation {
    # logs in user. Email and password required. Returns Auth
    login(email: String!, password: String!): Auth
    # Adds new user. username, email, and password required. returns auth
    addUser(username: String!, email: String!, password: String!): Auth
    # adds book to user's savedBooks array
    saveBook(content: bookContent): User
    # removes book by bookId
    removeBook(bookId: ID!): Book
  }
`;

module.exports = { typeDefs };
