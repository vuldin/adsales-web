import React, { Component } from 'react'
import WebFontLoader from 'webfontloader'
import './App.scss'
import { observer } from 'mobx-react'
import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards'
import Button from 'react-md/lib/Buttons'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
})

@observer
class App extends Component {
  render() {
    let store = this.props.store
    let undo = this.props.undo
    return <div className='md-grid'>
      <Card className='md-cell'>
        <CardTitle title={store.welcomeMessage}/>
        <CardText>
          <span>{store.counter}</span>
        </CardText>
        <CardActions>
          <Button flat label='Increase' onClick={store.incCounter}/>
          <Button flat label='Undo' disabled={!undo.canUndo} onClick={undo.undo}/>
          <Button flat label='Redo' disabled={!undo.canRedo} onClick={undo.redo}/>
        </CardActions>
      </Card>
    </div>
  }
}

export default App
