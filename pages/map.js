import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import MapForm from '../components/MapForm'
import Button from 'react-md/lib/Buttons/Button'
import SelectField from 'react-md/lib/SelectFields'
import { observer, Provider } from 'mobx-react'
import { initStore } from '../store'

@observer
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    let spots = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryadspotstomap')
      .type('form')
      .send({
        data: JSON.stringify({
          agencyId: store.username,
        }),
      })
    spots = JSON.parse(spots.text)
    spots = spots.adspotsToMapData
    return { spots, lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      array: props.spots,
      broadcasterId: 'BroadcasterA',
    }
  }
  update = (id, update) => {
    let arr = [ ...this.state.array ]
    let modSpot = null
    let otherSpots = arr.filter( obj => {
      let result = false
      if(obj.id == id) modSpot = obj
      else result = true
      return result
    })
    modSpot[update.key] = update.val
    otherSpots.push(modSpot)
    otherSpots.sort( (a, b) => a.id - b.id)
    this.setState({ array: otherSpots })
  }
  submit = () => {
    request
      .post('//adsales-api-xrayyee.mybluemix.net/mapadspots')
      .type('form')
      .send({
        data: JSON.stringify({
          /*
          agencyId: 'AgencyA',
          broadcasterId: 'BroadcasterA',
          */
          agencyId: this.store.username,
          broadcasterId: this.state.broadcasterId,
          spots: this.state.array.map( obj => JSON.stringify(obj))
        })
      })
      .end( (err, res) => {
        if(err) console.log('err', err)
        else console.log('success', res)
      })
  }
  render() {
    return <Provider store={this.store}>
      <Dashboard>
        <ExpansionList>
          {this.state.array.map( (obj, i) => <MapForm key={i} obj={obj} update={ this.update }/>)}
        </ExpansionList>
        <Button raised primary label='Submit' onClick={() => {
          this.submit()
        }}/>
        <div>{this.store.username}</div>
        <SelectField
          id='select-field-broadcaster'
          defaultValue='BroadcasterA'
          placeholder='Broadcaster ID'
          menuItems={['BroadcasterA', 'BroadcasterB', 'BroadcasterC']}
          className='md-cell'
          onChange={val => this.setState({broadcasterId: val})}
        />
      </Dashboard>
    </Provider>
  }
}
