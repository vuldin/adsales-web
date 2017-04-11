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
      agencyId: this.store.username,
      broadcasterId: 'BroadcasterA',
      lotId: '1000',
      spots: props.orders == null ? [] : props.orders,
      response: '',
    }
  }
  retrieve = () => {
    return api
  }
  updateSpots = spot => {
    let arr = this.state.spots.map( oldspot => {
      if(oldspot.adspotId == spot.adspotId) return spot
      else return oldspot
    })
    this.setState({spots: arr})
  }
  submit() {
    let data = {
      agencyId: this.state.agencyId,
      broadcasterId: this.state.broadcasterId,
      spots: this.state.spots.map( (val, i) => {
        return JSON.stringify(val)
      })
    }
    console.log(data)
    /*
    {"agencyId":"AgencyA","broadcasterId":"BroadcasterA","spots":["{\"lotId\":\"1000\",\"adspotId\":\"1\",\"orderNumber\":\"1\",\"advertiserId\":\"AdvertiserA\",\"adContractId\":\"1\",\"numberOfSpots\":\"2\"}","{\"lotId\":\"1000\",\"adspotId\":\"2\",\"orderNumber\":\"1\",\"advertiserId\":\"AdvertiserC\",\"adContractId\":\"1\",\"numberOfSpots\":\"1\"}"]}
    {"agencyId":"AgencyA","broadcasterId":"BroadcasterA","spots":["{\"lotId\":\"1000\",\"adspotId\":\"1\",\"programName\":\"Massive Crime Wave\",\"genre\":\"Drama\",\"dayPart\":\"Prime Wednesday\",\"targetGrp\":\"3.3\",\"targetDemographics\":\"Women 12 - 55\",\"initialCpm\":\"3.44\",\"bsrp\":\"1300.6\",\"numberOfSpots\":\"2\",\"orderNumber\":123,\"advertiserId\":\"AdvertiserC\",\"adContractId\":\"123\",\"reserveSpots\":1}","{\"lotId\":\"1000\",\"adspotId\":\"2\",\"programName\":\"Cars\",\"genre\":\"Action\",\"dayPart\":\"Prime Tuesday\",\"targetGrp\":\"1.3\",\"targetDemographics\":\"Men 20 - 40\",\"initialCpm\":\"3.34\",\"bsrp\":\"100.6\",\"numberOfSpots\":\"2\",\"orderNumber\":123,\"advertiserId\":\"AdvertiserC\",\"adContractId\":\"123\",\"reserveSpots\":1}"]}
    */
    request
      .post('//adsales-api-xrayyee.mybluemix.net/placeorders')
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
          <div style={{width: 130}}>Reserve Spots</div>
        </div>
        <ExpansionList>
           {this.state.spots.map( (spot, i) => <PlaceForm key={i} obj={spot} update={this.updateSpots}/>)}
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
