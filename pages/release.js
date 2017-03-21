import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'
import Button from 'react-md/lib/Buttons/Button'
import api from '../api.json'

function uiToApi(val) {
  return {
    adspotId: val.id,
    programName: val.program,
    seasonEpisode: `${val.season}${val.episode}`,
    genre: val.genre,
    dayPart: `${val.timeSlotDescription} ${val.dayOfWeek}`,
    targetGrp: val.targetGRP,
    targetDemographics: val.targetDemographics,
    initialCpm: val.initialCPM,
    bsrp: val.bsrp,
    numberOfSpots: val.availableSpots,
    numberReservedSpots: val.reserveSpots
  }
}

export default class extends React.Component {
  retrieve() {
    return api.summaries
  }
  submit(vals) {
    let result = {
      broadcasterId: 'BroadcasterA',
      lotId: '1000',
      spots: vals.map( (val, i) => {
        val.id = i + 1
        let result = uiToApi(val)
        return JSON.stringify(result)
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
        console.log('success', res)
      })
  }
  constructor() {
    super()
    this.state = {
      summaries: [],
    }
  }
  render() {
    return <Dashboard>
      <ExpansionList>
         {this.state.summaries.map( (summary, i) => <SummaryForm key={`summary${i}`} summary={summary}/>)}
      </ExpansionList>
      <Button raised primary label='Retrieve' onClick={() => {
        this.setState({
          summaries: this.retrieve()
        })
      }}/>
      <Button raised primary label='Ok' iconClassName='fa fa-hand-spock-o' onClick={() => {
        this.submit(this.state.summaries)
      }}/>
    </Dashboard>
  }
}
