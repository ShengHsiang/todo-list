import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Todo {
    id: ID!
    note: String!
    complete: Boolean!
  }

  type Query {
    viewer: User
    todos: [Todo]
  }

  type Mutation {
    addTodo(id: ID!, note: String!): Todo
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Todo
  }
`
