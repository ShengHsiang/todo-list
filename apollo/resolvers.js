var todolists = [
  { id: "9823f3e8-17df-4831-9006-6b846e019e8a", note: 'Buy milk', complete: false },
  { id: "9ea119d1-78f2-4db2-88d3-addcd5598b5c", note: 'Buy eggs', complete: true },
]

const findTodoById = (id) => {
  return todolists.find(todo => todo.id === id)
}

const deleteTodoById = id =>
todolists.splice(todolists.findIndex(todo => todo.id === id), 1)[0];

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
    todos(_parent, _args, _context, _info) {
      return todolists
    }
  },
  Mutation: {
    addTodo(_parent, { note, id }, _context, _info) {
      todolists = [{ id, note, complete: false },...todolists]
      return { id, note, complete: false }
    },
    toggleTodo(_parent, { id }, _context, _info) {
      let todo = findTodoById(id)
      todo.complete = !todo.complete
      return { ...todo }
    },
    deleteTodo(_parent, { id }, _context, _info) {
      deleteTodoById(id)
      return { id }
    }
  }
}
