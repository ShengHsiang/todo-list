import gql from 'graphql-tag'

export const TodoQuery = gql`
  query TodoQuery {
    todos {
      id
      note
      complete
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($id: ID!, $note: String!) {
    addTodo(id: $id, note: $note) {
      id
      note
      complete
    }
  }
`

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      note
      complete
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`


