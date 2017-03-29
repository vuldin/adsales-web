import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'

function apiToUi(val) {
  return {
    uniqueAdspotId: val.uniqueAdspotId,
    broadcaster: val.broadcasterId,
    adContractId : val.adContractId,
    campaignName : val.campaignName,
    advertiserId : val.advertiserId,
    targetGrp : val.targetGrp,
    targetDemographics : val.targetDemographics,
    initialCpm : val.initialCpm
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
    console.log('getInitialProps - map.js - queryAdspotsToMap')
    let summaries = await request
      .post('//adsales-api-xrayyee.mybluemix.net/queryAdspotsToMap')
      .type('form')
      .send({
        data: JSON.stringify({ "agencyId": "AgencyA" }),
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
