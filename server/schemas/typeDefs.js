const { gql } = require('apollo-server-express');

const typeDefs = gql`

  # Queries
  type Query {
    me: User
  }

  # Mutations
  type Mutation {
    # logs in user. Email and password required. Returns Auth
    login(email: String!, password: String!): Auth
    # Adds new user. username, email, and password required. returns auth
    addUser(username: String!, email: String!, password: String!): Auth
    # TODO: add saveBook parameters (look into input type)
    saveBook(): User
    # removes book by bookId
    removeBook(bookId: ID!)
  }

  # User
  type User {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }

# Book
type Book {
  bookId
  authors
  description
  title
  image
  link
}

# Auth
type Auth {
  token
  user
}
`;

module.exports = { typeDefs };
