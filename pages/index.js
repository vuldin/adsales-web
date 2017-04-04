import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Dashboard from '../components/Dashboard'
import map from '../lib/map'

export default class Index extends React.Component {
  getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return { lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
  }
  componentDidMount() {
    map(this.refs.map)
  }

  render() {
    return <Provider store={this.store}>
      <Dashboard>
        <div
          ref='map'
          style={{
            width: '700px',
            height: '400px',
          }}
        ></div>
      </Dashboard>
    </Provider>
  }
}
