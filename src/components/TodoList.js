import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onToggleTodo, onEditTodo}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        toggleCompleted={() => onToggleTodo(todo.id)}
        editTodo={() => onEditTodo(todo)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
}

export default TodoList
