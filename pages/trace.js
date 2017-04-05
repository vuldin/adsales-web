import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'
import { observer, Provider } from 'mobx-react'
import { initStore } from '../store'

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

@observer
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    let summaries = await request
      .post('//adsales-api-xrayyee.mybluemix.net/querytraceadspots')
      .type('form')
      .send({
        data: JSON.stringify({userId: 'BroadcasterA'}),
      })
    summaries = JSON.parse(summaries.text)
    return { summaries, lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    let arr = props.summaries.map( summary => apiToUi(summary) )
    this.store = initStore(props.isServer, props.lastUpdate)
    this.state = {
      summaries: arr,
    }
  }
  render() {
    return <Dashboard>
      <div>{this.store.username}</div>
      <ExpansionList>
         {this.state.summaries.map( (summary, i) => <SummaryForm key={`summary${i}`} summary={summary}/>)}
      </ExpansionList>
    </Dashboard>
  }
}
