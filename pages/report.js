import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import ReportForm from '../components/ReportForm'
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
      broadcasterId: store.username,
    }
    data = JSON.stringify(data)
    let orders = await request // TODO move to a retrieve function so broadcasterId can be chosen
      .post('//adsales-api-xrayyee.mybluemix.net/queryasrun')
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    orders = orders.queryAsRunData
    return { orders, lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    console.log('report constructor')
    console.log(props.orders)
    this.state = {
      broadcasterId: 'BroadcasterA',
      spots: props.orders == null ? [] : props.orders,
      response: '',
    }
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
    console.log(JSON.stringify(data))
    request
      .post('//adsales-api-xrayyee.mybluemix.net/reportasrun')
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
          <div style={{width: 50}}>Contract</div>
          <div style={{width: 145}}>Campaign</div>
          <div style={{width: 105}}>Advertiser</div>
          <div style={{width: 130}}>Target GRP</div>
          <div style={{width: 130}}>Demographic</div>
          <div style={{width: 130}}>Initial CPM</div>
        </div>
        <ExpansionList>
           {this.state.spots.map( (spot, i) => <ReportForm key={i} obj={spot} update={this.updateSpots}/>)}
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
