import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './store'
import { Undo } from 'json-mobx'

const store = new Store()

const undo = new Undo(store)
/*
const undo = new Undo(store, after => {
  console.log('undo')
  console.log(JSON.stringify(after, null, 2))
})
*/

ReactDOM.render(
  <App store={store} undo={undo}/>,
  document.getElementById('root')
)
