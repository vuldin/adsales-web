import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import ReportForm from '../components/ReportForm'
import Button from 'react-md/lib/Buttons/Button'

export default class extends React.Component {
  static async getInitialProps() {
    let spots = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryAsRun')
      .type('form')
      .send({
        data: JSON.stringify({
          broadcasterId: 'BroadcasterA'
        }),
      })
    spots = JSON.parse(spots.queryAsRunData)
    return { spots }
  }
  constructor(props) {
    super(props)
    this.state = {
      //spots: props.spots,
      spots: []
    }
  }
  update = (orderNumber, update) => {
    let arr = [ ...this.state.orders ]
    let modOrder = null
    let otherOrders = arr.filter( order => {
      let result = false
      if(order.orderNumber == orderNumber) modOrder = order
      else result = true
      return result
    })
    modOrder[update.key] = update.val
    otherOrders.push(modOrder)
    otherOrders.sort( (a, b) => a.orderNumber - b.orderNumber)
    this.setState({ order: otherOrders })
  }
  submit = () => {
    request
      .post('//adsales-api-xrayyee.mybluemix.net/placeorders')
      .type('form')
      .send({
        data: JSON.stringify({
          agencyId: 'AgencyA',
          broadcasterId: 'BroadcasterA',
          spots: this.state.orders.map(order => JSON.stringify(order))
        })
      })
      .end( (err, res) => {
        if(err) console.log('err', err)
        else console.log('success', res)
      })
  }
  render() {
    return <Dashboard>
      <ExpansionList>
         {this.state.spots.map( (spot, i) => <ReportForm key={i} spot={spot} update={ this.update }/>)}
      </ExpansionList>
      <Button raised primary label='Submit' onClick={() => {
        this.submit()
      }}/>
    </Dashboard>
  }
}
