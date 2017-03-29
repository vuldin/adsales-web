import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import SummaryForm from '../components/SummaryForm'

export default class extends React.Component {
  static async getInitialProps() {
    let summaries = await request
      .get('//localhost:3000/summaries')
    summaries = summaries.body
    return { summaries }
  }
  constructor(props) {
    super(props)
    this.state = {
      summaries: props.summaries,
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
