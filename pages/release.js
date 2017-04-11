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
      .post('//adsales-api-xrayyee.mybluemix.net/releaseinventory')
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
            justify-content: space-between;
            width: ${this.store.columnWidths}px;
            padding-left: 24px;
            padding-top: 10px;
          }
        `}</style>
          <div style={{width: 50}}>Spot ID</div>
          <div style={{width: 145}}>Program</div>
          <div style={{width: 105}}>Target</div>
          <div style={{width: 130}}>Reserve Spots</div>
          <div style={{width: 130}}>Available Spots</div>
        </div>
        <ExpansionList>
           {this.state.spots.map( (spot, i) => <ReleaseForm key={i} obj={spot} update={this.updateSpots}/>)}
        </ExpansionList>
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
      </Dashboard>
    </Provider>
  }
}
