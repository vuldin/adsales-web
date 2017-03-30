import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import OrderForm from '../components/OrderForm'
import Button from 'react-md/lib/Buttons/Button'

export default class extends React.Component {
  static async getInitialProps() {
    let orders = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryplaceorders')
      .type('form')
      .send({
        data: JSON.stringify({
          agencyId: 'AgencyA',
          broadcasterId: 'BroadcasterA',
        }),
      })
    orders = JSON.parse(orders.text)
    orders = orders.placedOrderData
    return { orders }
  }
  constructor(props) {
    super(props)
    let orders = props.orders.map( (order, i) => {
      return {
        ...order,
        orderNumber: i + 1,
        advertiserId: 'AdvertiserA',
        adContractId: 0,
        numberOfSpots: 0,
      }
    })
    this.state = {
      orders: orders,
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
         {this.state.orders.map( (order, i) => <OrderForm key={`order${i}`} order={ order } update={ this.update }/>)}
      </ExpansionList>
      <Button raised primary label='Submit' onClick={() => {
        this.submit()
      }}/>
    </Dashboard>
  }
}
