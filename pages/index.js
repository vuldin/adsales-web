import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from '../components/Dashboard'
import map from '../lib/map'

export default class Index extends React.Component {
  componentDidMount() {
    map(this.refs.map)
  }

  render() {
    return <Dashboard>
      <div
        ref='map'
        style={{
          width: '700px',
          height: '400px',
        }}
      ></div>
    </Dashboard>
  }
}
