import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import MapForm from '../components/MapForm'
import Button from 'react-md/lib/Buttons/Button'

export default class extends React.Component {
  static async getInitialProps() {
    let spots = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryadspotstomap')
      .type('form')
      .send({
        data: JSON.stringify({
          agencyId: 'AgencyA',
        }),
      })
    spots = JSON.parse(spots.text)
    spots = spots.adspotsToMapData
    return { spots }
  }
  constructor(props) {
    super(props)
    /*
    uniqueAdspotId: "1000_1",
    broadcasterId:"BroadcasterA",
    adContractId:1,
    campaignName:"",
    advertiserId:"AdvertiserA",
    targetGrp:3.3,
    targetDemographics:"Men 12 - 55",
    initialCpm:3.44
    */
    this.state = {
      array: props.spots,
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
          agencyId: 'AgencyA',
          broadcasterId: 'BroadcasterA',
          spots: this.state.array.map( obj => JSON.stringify(obj))
        })
      })
      .end( (err, res) => {
        if(err) console.log('err', err)
        else console.log('success', res)
      })
  }
  render() {
    console.log('map render')
    console.log(this.state.array)
    return <Dashboard>
      <ExpansionList>
        {this.state.array.map( (obj, i) => <MapForm key={i} obj={obj} update={ this.update }/>)}
      </ExpansionList>
      <Button raised primary label='Submit' onClick={() => {
        this.submit()
      }}/>
    </Dashboard>
  }
}
