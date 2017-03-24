import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'

function apiToUi(val) {
  return {
    id: val.adspotId,
    program: val.programName,
    broadcaster: val.broadcasterId,
    genre: val.genre,
    dayPart : val.dayPart,
    timeSlotDescription: val.dayPart.split(' ')[0],
    dayOfWeek: val.dayPart.split(' ')[1],
    targetGRP: val.targetGrp,
    targetDemographics: val.targetDemographics,
    initialCPM: val.initialCpm,
    bsrp: val.bsrp,
    availableSpots: val.numberOfSpots
  }
}

function uiToApi(val) {
  return {
    lotId: "" + val.lotId,
    adspotId: '' + val.id,
    advertiserId: val.advertiserId,
    adContractId: val.adContractId,
    numberOfSpots: '' + val.availableSpots
  }
}

export default class extends React.Component {
  static async getInitialProps() {
    console.log('getInitialProps - place.js - queryPlaceOrders')
    let summaries = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryPlaceOrders')
      .type('form')
      .send({
        data: JSON.stringify({ "agencyId": "AgencyA", "broadcasterId": "BroadcasterA" }),
      })
    summaries = JSON.parse(summaries.text)
    return { summaries }
  }
  constructor(props) {
    super(props)
    let arr = props.summaries.map( summary => apiToUi(summary) )
    this.state = {
      summaries: arr,
    }
  }
  render() {
    return <Dashboard>
      <ExpansionList>
         {this.state.summaries.map( (summary, i) => <SummaryForm key={`summary${i}`} summary={summary}/>)}
      </ExpansionList>
    </Dashboard>
  }
}
