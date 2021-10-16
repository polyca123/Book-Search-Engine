const { gql } = require('apollo-server-express')

const typeDefs = gql `
  type Book {
    bookid: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    authors: [String]
    desciption: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }
`

module.exports = typeDefs