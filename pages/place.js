import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import OrderForm from '../components/OrderForm'

function apiToUi(val) {
  return {
    id: val.adspotId,
    program: val.programName,
    broadcaster: val.broadcasterId,
    genre: val.genre,
    dayPart : val.dayPart,
    timeSlotDescription: val.dayPart.split(' ')[0],
    dayOfWeek: val.dayPart.split(' ')[1],
    targetGRP: val.targetGrp,
    targetDemographics: val.targetDemographics,
    initialCPM: val.initialCpm,
    bsrp: val.bsrp,
    availableSpots: val.numberOfSpots
  }
}

function uiToApi(val) {
  return {
    lotId: "" + val.lotId,
    adspotId: '' + val.id,
    advertiserId: val.advertiserId,
    adContractId: val.adContractId,
    numberOfSpots: '' + val.availableSpots
  }
}

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
    let arr = props.summaries.map( summary => apiToUi(summary) )
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
