import React, { PropTypes } from 'react'

const Todo = ({ toggleCompleted, editTodo, id, completed, text }) => (
  <li>
    <div
      onClick={toggleCompleted}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >complete</div>
      <form onSubmit={event => {
        event.preventDefault()
        console.log(event.target)
        editTodo()
      }}>
        <input ref='text' defaultValue={text}/>
        <input type='submit' value='Submit'/>
      </form>
      {/*
      <input defaultValue={text}/>
      <button onClick={() =>{
        editTodo()
      }}>Submit</button>
      */}
  </li>
)

Todo.propTypes = {
  toggleCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
