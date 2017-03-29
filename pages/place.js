import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import OrderForm from '../components/OrderForm'

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
    this.state = {
      orders: props.orders,
    }
  }
  render() {
    return <Dashboard>
      <ExpansionList>
         {this.state.orders.map( (order, i) => <OrderForm key={`order${i}`} order={ order }/>)}
      </ExpansionList>
    </Dashboard>
  }
}
