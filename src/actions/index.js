let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

/*
export const editTodo = todo => ({
  type: 'EDIT_TODO',
  id: todo.id,
  text: todo.text,
  completed: todo.completed,
})
*/
export const editTodo = todo => {
  console.log('action editTodo')
  console.log(todo)
  return {
    type: 'EDIT_TODO',
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
  }
}
