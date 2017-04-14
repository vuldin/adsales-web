import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import ReleaseForm from '../components/ReleaseForm'
import releaseData from '../data/release.json'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
//import broadcasterUrl from '../static/BroadcasterA.png'

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function getNewSpot() {
  return {
    adspotId: 0,
    programName: '',
    seasonEpisode: '',
    genre: '',
    dayPart: '',
    targetGrp: 0.0,
    targetDemographics: '',
    initialCpm: 0.0,
    bsrp: 0.0,
    numberOfSpots: 0,
    numberReservedSpots: 0,
  }
}
export default class extends React.Component {
  getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return { lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      broadcasterId: this.store.username,
      lotId: '1000',
      spots: [],
      response: '',
    }
  }
  retrieve = () => {
    return releaseData
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
      broadcasterId: this.state.broadcasterId,
      lotId: this.state.lotId,
      spots: this.state.spots.map( (val, i) => {
        return JSON.stringify(val)
      })
    }
    request
      .post(`//${this.store.apiServer}/releaseinventory`)
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
      type: 'Release Inventory',
    })
    this.store.blockchain = newBlockchain
  }
  componentWillMount() {
    this.store.navItems.map( obj => {
      obj.component.href == this.props.url.pathname ? obj.component.active = true : obj.component.active = false
    })
  }
  render() {
    let broadcasterUrl = 'static/BroadcasterA.png'
    let agencyAUrl = 'static/AdAgencyA.png'
    let advertiserAUrl = 'static/AdvertiserA.png'
    let advertiserCUrl = 'static/AdvertiserC.png'
    let otherPeerUrl = 'static/OtherPeers.png'
    let ledgerUrl = 'static/BlockchainServices.png'
    let chartObjWidth = 250
    let rectangle = 'l0,100 l175,0 l0,-100 l-175,0'
    return <Provider store={this.store}>
      <Dashboard>
        <div style={{
          backgroundColor: 'white',
          width: '800px',
          height: '350px',
          paddingTop: '8px',
        }}>
<svg width='800' height='350'>
  <title>Test</title>
  <defs>
    <pattern id="broadcasterA" patternUnits="userSpaceOnUse" width="200" height="100">
      <image xlinkHref={broadcasterUrl} x="0" y="0" width="200" height="100"/>
    </pattern>
  </defs>
  <path d={`M5,70 ${rectangle} Z`} fill={`url(${broadcasterUrl})`}/>
  <path d={`M200,0 ${rectangle} Z`} fill="red"/>
  {/*
  <path d="M5,50 l0,100 l100,0 l0,-100 l-100,0 Z" fill="url(#broadcasterA)"/>
  <path d="M215,100 a50,50 0 1 1 -100,0 50,50 0 1 1 100,0 Z" fill="url(#broadcasterA)"/>
  */}
</svg>
          {/*
          <img src={broadcasterUrl} width={chartObjWidth} style={{
            position: 'fixed',
            transform: 'translate(0px, 70px)'
          }}/>
          <img src={agencyAUrl} width={chartObjWidth} style={{
            position: 'fixed',
            transform: 'translate(275px, 0px)'
          }}/>
          <img src={advertiserAUrl} width={chartObjWidth} style={{
            position: 'fixed',
            transform: 'translate(550px, 70px)'
          }}/>
          <img src={advertiserCUrl} width={chartObjWidth} style={{
            position: 'fixed',
            transform: 'translate(430px, 195px)'
          }}/>
          <img src={otherPeerUrl} width={chartObjWidth} style={{
            position: 'fixed',
            transform: 'translate(120px, 200px)'
          }}/>
          <img src={ledgerUrl} width={chartObjWidth*.75} style={{
            position: 'fixed',
            transform: 'translate(275px, 100px)'
          }}/>
          */}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button raised primary label='Populate' onClick={() => {
            let api = this.retrieve()
            this.setState({
              broadcasterId: api.broadcasterId,
              lotId: api.lotId,
              spots: api.spots,
            })
          }}/>
          <Button raised primary label='Submit' onClick={() => {
            this.submit(this.state)
          }}/>
          <div style={{
            color: 'rgba(0,0,0,.54)',
            marginLeft: '10px',
          }}>{this.state.response}</div>
        </div>
        <TextField
          id='text-field-lot-id'
          label='Lot ID'
          value={this.state.lotId}
          floating
          fullWidth={false}
          className='md-cell md-cell--top'
          onChange={ val => {
            if(isNumeric(val)) {
              this.setState({ lotId: +val })
            }
          }}
        />
        <div className='header'>
        <style jsx>{`
          .header {
            display: flex;
            padding-left: 24px;
            padding-top: 10px;
          }
        `}</style>
          <div style={{width: 100}}>Spot ID</div>
          <div style={{width: 165}}>Program Name</div>
          <div style={{width: 145}}>Target Demographic</div>
          <div style={{width: 100}}>Target GRP</div>
          <div style={{width: 130}}>Available Spots</div>
        </div>
        <ExpansionList>
           {this.state.spots.map( (spot, i) => <ReleaseForm key={i} obj={spot} update={this.updateSpots}/>)}
        </ExpansionList>
      </Dashboard>
    </Provider>
  }
}
