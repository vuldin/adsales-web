import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'

function apiToUi(val) {
  return {
    uniqueAdspotId: val.uniqueAdspotId,
    adspotId: val.adspotId,
    adContractId : val.adContractId,
    campaignName : val.campaignName,
    programName : val.programName,
    targetGrp : val.targetGrp,
    targetDemographics : val.targetDemographics,
    contractResults: val.contractResults,
    airedDate : val.airedDate,
    actualProgramName : val.actualProgramName,
    actualDemographics : val.actualDemographics,
    makeupAdspotId : val.makeupAdspotId
  }
}

function uiToApi(val) {
  return {
    uniqueAdspotId: val.uniqueAdspotId,
    campaignName : val.campaignName
  }
}

export default class extends React.Component {
  static async getInitialProps() {
    console.log('getInitialProps - report.js - queryAsRun') 
    let summaries = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryAsRun')
      .type('form')
      .send({
        data: JSON.stringify({ "broadcasterId": "BroadcasterA" }),
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
