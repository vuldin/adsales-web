import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import ReportForm from '../components/ReportForm'
import reportData from '../data/report.json'
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
      broadcasterId: store.username,
    }
    data = JSON.stringify(data)
    let orders = await request // TODO move to a retrieve function so broadcasterId can be chosen
      .post(`//${store.apiServer}/queryasrun`)
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    orders = orders.queryAsRunData.map( order => {
      order.actualGrp = ''
      order.actualProgramName = ''
      order.actualDemographics = ''
      order.makupAdspotId = ''
      return order
    })
    store.reportObjs = orders
    return { lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      broadcasterId: 'BroadcasterA',
      response: '',
    }
  }
  populate = () => {
    return reportData
  }
  submit(spots) {
    let arr = spots.map( spot => {
      spot.adContractId = `${spot.adContractId}`
      spot.adspotId = `${spot.adspotId}`
      spot.targetGrp = `${spot.targetGrp}`
      return spot
    })
    let data = {
      agencyId: 'AgencyA',
      broadcasterId: this.state.broadcasterId,
      spots: arr.map( (val, i) => {
        return JSON.stringify(val)
      })
    }
    request
      .post(`//${this.store.apiServer}/reportasrun`)
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
      user: 'BroadcasterA',
      type: 'Report Aired Ads',
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
          <div style={{width: 150}}>Unique Adspot ID</div>
          <div style={{width: 200}}>Adspot ID</div>
          <div style={{width: 145}}>Contract ID</div>
          <div style={{width: 105}}>Campaign</div>
          <div style={{width: 150}}>Program</div>
          <div style={{width: 130}}>Target GRP</div>
          <div style={{width: 150}}>Target Demographic</div>
        </div>
        <ExpansionList>
           {this.store.reportObjs.map( (spot, i) => <ReportForm key={i} index={i}/>)}
        </ExpansionList>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button raised primary label='Populate' onClick={() => {
            let data = this.populate()
            let arr = this.store.reportObjs.map( (spot, i) => {
              spot.actualGrp = data[i].actualGrp
              spot.actualProgramName = data[i].actualProgramName
              spot.actualDemographics = data[i].actualDemographics
              spot.makupAdspotId = data[i].makeupAdspotId
              return spot
            })
            this.store.reportObjs = arr
          }}/>
          <Button raised primary label='Submit' onClick={() => {
            this.submit(this.store.reportObjs)
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
