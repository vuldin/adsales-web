import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'

function apiToUi(val) {
  return {
    id: val.adspotId,
    program: val.programName,
    //seasonEpisode: `${val.season}${val.episode}`,
    season: val.seasonEpisode.substring(0, 3),
    episode: val.seasonEpisode.substring(3, val.seasonEpisode.length),
    genre: val.genre,
    //dayPart: `${val.timeSlotDescription} ${val.dayOfWeek}`,
    timeSlotDescription: val.dayPart.split(' ')[0],
    dayOfWeek: val.dayPart.split(' ')[1],
    targetGRP: val.targetGrp,
    targetDemographics: val.targetDemographics,
    initialCPM: val.initialCpm,
    bsrp: val.bsrp,
    availableSpots: val.numberOfSpots,
    reserveSpots: val.numberReservedSpots
  }
}

export default class extends React.Component {
  static async getInitialProps() {
    console.log('getInitialProps')
    let summaries = await request
      .post('//adsales-api-xrayyee.mybluemix.net/querytraceadspots')
      .type('form')
      .send({
        data: JSON.stringify({userId: 'BroadcasterA'}),
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
