import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import MapForm from '../components/MapForm'
import mapData from '../data/map.json'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import { toJS } from 'mobx'

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    let data = {
      agencyId: store.username,
    }
    data = JSON.stringify(data)
    let orders = await request // TODO move to a retrieve function so broadcasterId can be chosen
      .post(`//${store.apiServer}/queryadspotstomap`)
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    orders = orders.adspotsToMapData.map( order => {
      order.campaignName = ''
      return order
    })
    store.mapObjs = orders
    return { lastUpdate: store.lastUpdate, isServer }
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
    return mapData
  }
  submit(spots) {
    let arr = spots.map( spot => {
      spot.adContractId = `${spot.adContractId}`
      spot.initialCpm = `${spot.initialCpm}`
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
      .post(`//${this.store.apiServer}/mapadspots`)
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
      type: 'Map Ads',
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
              padding-left: 24px;
              padding-top: 10px;
            }
          `}</style>
          <div style={{width: 100}}>Contract ID</div>
          <div style={{width: 145}}>Campaign</div>
          <div style={{width: 105}}>Advertiser</div>
          <div style={{width: 130}}>Target GRP</div>
          <div style={{width: 130}}>Demographic</div>
          <div style={{width: 130}}>Initial CPM</div>
        </div>
        <ExpansionList>
           {this.store.mapObjs.map( (spot, i) => <MapForm key={i} index={i}/>)}
        </ExpansionList>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button raised primary label='Populate' onClick={() => {
            let data = this.populate()
            let arr = this.store.mapObjs.map( (spot, i) => {
              spot.campaignName = data[i].campaignName
              return spot
            })
            this.store.mapObjs = arr
          }}/>
          <Button raised primary label='Submit' onClick={() => {
            this.submit(this.store.mapObjs)
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
