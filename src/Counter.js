import React, { PureComponent } from 'react'
import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards'
import Button from 'react-md/lib/Buttons'
import { observer } from 'mobx-react'

@observer
class Counter extends PureComponent {
  render() {
    let store = this.props.store
    let undo = this.props.undo
    return <Card className='md-cell md-cell--12'>
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
  }
}

export default Counter
