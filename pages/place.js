import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import PlaceForm from '../components/PlaceForm'
import placeData from '../data/place.json'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    let data = {
      agencyId: store.username,
      broadcasterId: 'BroadcasterA', // TODO pull from store
    }
    data = JSON.stringify(data)
    let orders = await request // TODO move to a retrieve function so broadcasterId can be chosen
      .post(`//${store.apiServer}/queryplaceorders`)
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    orders = orders.placedOrderData.map( order => {
      order.orderNumber = ''
      order.advertiserId = ''
      order.adContractId = ''
      order.numberOfSpotsToPurchase = '0'
      return order
    })
    store.placeObjs = orders
    return { orders, lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      agencyId: this.store.username,
      broadcasterId: 'BroadcasterA',
      lotId: '1000',
      response: '',
    }
  }
  populate = () => {
    return placeData
  }
  submit(spots) {
    let arr = spots.map( spot => {
      spot.adspotId = `${spot.adspotId}`
      spot.bsrp = `${spot.bsrp}`
      spot.initialCpm = `${spot.initialCpm}`
      spot.lotId = `${spot.lotId}`
      spot.numberOfSpots = `${spot.numberOfSpots}`
      spot.targetGrp = `${spot.targetGrp}`
      return spot
    })
    let data = {
      agencyId: this.state.agencyId,
      broadcasterId: this.state.broadcasterId,
      spots: arr.map( (val, i) => {
        return JSON.stringify(val)
      })
    }
    request
      .post(`//${this.store.apiServer}/placeorders`)
      .type('form')
      .send({
        data: JSON.stringify(data)
      })
      .end( (err, res) => {
        if(err) console.log('err', err)
        else {
          let response = JSON.parse(res.text)
          response = response.uuid
          this.setState({ response: `success (${response})`})
        }
      })
    let min = 1000
    let max = 9999
    let newBlockchain = this.store.blockchain.slice()
    newBlockchain.push({
      id: `...${Math.floor(Math.random() * (max - min + 1)) + min}`,
      user: 'AgencyA',
      type: 'Place Orders',
    })
    this.store.blockchain = newBlockchain
  }
  componentWillMount() {
    this.store.navItems.map( obj => {
      obj.component.href == this.props.url.pathname ? obj.component.active = true : obj.component.active = false
    })
  }
  render() {
    return <Provider store={this.store}>
      <Dashboard>
        <div className='header'>
          <style jsx>{`
            .header {
              display: flex;
              justify-content: space-between;
              width: ${this.store.columnWidths}px;
              padding-left: 24px;
              padding-top: 10px;
            }
          `}</style>
          <div style={{width: 50}}>Spot ID</div>
          <div style={{width: 145}}>Program</div>
          <div style={{width: 105}}>Target</div>
          <div style={{width: 130}}>Available Spots</div>
          <div style={{width: 130}}>Advertiser ID</div>
          <div style={{width: 200}}>{`Number of spots to purchase`}</div>
        </div>
        <ExpansionList>
           {this.store.placeObjs.map( (spot, i) => <PlaceForm key={i} index={i}/>)}
        </ExpansionList>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button raised primary label='Populate' onClick={() => {
            let data = this.populate()
            let arr = this.store.placeObjs.map( (spot, i) => {
              spot.orderNumber = data[i].orderNumber
              spot.advertiserId = data[i].advertiserId
              spot.adContractId = data[i].adContractId
              spot.numberOfSpotsToPurchase = data[i].numberOfSpotsToPurchase
              return spot
            })
            this.store.placeObjs = arr
          }}/>
          <Button raised primary label='Submit' onClick={() => {
            this.submit(this.store.placeObjs)
          }}/>
          <div style={{
            color: 'rgba(0,0,0,.54)',
            marginLeft: '10px',
          }}>{this.state.response}</div>
        </div>
      </Dashboard>
    </Provider>
  }
}
