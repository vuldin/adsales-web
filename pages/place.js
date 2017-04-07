import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import PlaceForm from '../components/PlaceForm'
import api from '../api.json'
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
      .post('//adsales-api-xrayyee.mybluemix.net/queryplaceorders')
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    orders = orders.placedOrderData
    return { orders, lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      broadcasterId: this.store.username,
      lotId: 1000,
      spots: props.orders,
      response: '',
    }
  }
  retrieve = () => {
    return api
  }
  submit() {
    let result = {
      broadcasterId: this.state.broadcasterId,
      lotId: JSON.stringify(this.state.lotId),
      spots: this.state.spots.map( (val, i) => {
        return JSON.stringify(val)
      })
    }
    request
      .post('//adsales-api-xrayyee.mybluemix.net/releaseinventory')
      .type('form')
      .send({
        data: JSON.stringify(result)
      })
      .end( (err, res) => {
        if(err) console.log('err', err)
        console.log('success', res.text)
      })
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
          <div style={{width: 130}}>Spots available</div>
        </div>
        <ExpansionList>
           {this.state.spots.map( (spot, i) => <PlaceForm key={i} obj={spot}/>)}
        </ExpansionList>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button raised primary label='Submit' onClick={() => {
            this.submit(this.state)
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
