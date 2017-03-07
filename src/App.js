import React, { Component } from 'react'
import WebFontLoader from 'webfontloader'
import './App.scss'
import Button from 'react-md/lib/Buttons'
import Counter from './Counter'
import SpotForm from './SpotForm'
import Toolbar from 'react-md/lib/Toolbars'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
})

const nav = <Button key='nav' icon>menu</Button>
const actions = [
  <Button key='search' icon>search</Button>,
  <Button key='favorite' icon>favorite</Button>
]

class App extends Component {
  render() {
    let store = this.props.store
    let undo = this.props.undo
    return <div>
      <Toolbar
        colored
        title='Ad Sales'
        nav={nav}
        actions={actions}
      />
      <div className='md-toolbar-relative'>
        <section className='md-grid md-grid--40-16'>
          <Counter store={store} undo={undo}/>
          <SpotForm store={store}/>
        </section>
      </div>
    </div>
  }
}

export default App
