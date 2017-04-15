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
import 'fabric'

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
  componentDidMount() {
    let broadcasterUrl = 'static/BroadcasterA.png'
    let agencyAUrl = 'static/AdAgencyA.png'
    let advertiserAUrl = 'static/AdvertiserA.png'
    let advertiserCUrl = 'static/AdvertiserC.png'
    //let otherPeerUrl = 'static/OtherPeers.png'
    let ledgerUrl = 'static/BlockchainServices.png'
    var canvas = this.__canvas = new fabric.StaticCanvas('canvas');
    /*
    canvas.add(
      new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
      new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
      new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
    );
    */

    fabric.Image.fromURL(broadcasterUrl, img => {
      img.scale(0.2)
      canvas.add(img.set({
        left: 0,
        top: 300 - img.getHeight(),
        clipTo: ctx => ctx.arc(0, 0, 270, 0, Math.PI * 2, true)
      }))
    })
    fabric.Image.fromURL(agencyAUrl, img => {
      canvas.add(img.set({
        left: 200,
        top: 50,
        clipTo: ctx => ctx.arc(0, 0, 270, 0, Math.PI * 2, true)
      }).scale(0.2))
    })
    fabric.Image.fromURL(advertiserAUrl, img => {
      canvas.add(img.set({
        left: 400,
        top: 50,
        clipTo: ctx => ctx.arc(0, 0, 270, 0, Math.PI * 2, true)
      }).scale(0.2))
    })
    fabric.Image.fromURL(advertiserCUrl, img => {
      canvas.add(img.set({
        left: 400,
        top: 150,
        clipTo: ctx => ctx.arc(0, 0, 270, 0, Math.PI * 2, true)
      }).scale(0.2))
    })
    fabric.Image.fromURL(ledgerUrl, img => {
      canvas.add(img.set({
        clipTo: ctx => ctx.arc(0, 0, 270, 0, Math.PI * 2, true)
      }).scale(0.2))
      img.center()
    })

    /*
    function animate() {
      canvas.item(0).animate('top', canvas.item(0).getTop() === 500 ? '100' : '500', { 
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: animate
      });
    }
    animate();
    */
  }
  render() {
    let chartObjWidth = 250
    let rectangle = 'l0,100 l175,0 l0,-100 l-175,0'
    return <Provider store={this.store}>
      <Dashboard>
        <canvas id='canvas' width='900' height='300' style={{backgroundColor: 'white'}}/>
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
