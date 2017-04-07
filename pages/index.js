import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Dashboard from '../components/Dashboard'
import map from '../lib/map'
import { observer } from 'mobx-react'
import Clock from '../components/Clock'

@observer
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
  componentWillMount() {
    this.store.navItems.map( obj => {
      obj.component.href == this.props.url.pathname ? obj.component.active = true : obj.component.active = false
    })
  }
  componentDidMount() {
    //map(this.refs.map)
  }
  render() {
    return <Provider store={this.store}>
      <Dashboard>
        {/*
        <div
          ref='map'
          style={{
            width: '700px',
            height: '400px',
          }}
        />
        */}
        <div style={{
          display: 'flex',
          flexFlow: 'column',
        }}>
          <Clock lastUpdate={this.store.lastUpdate} light={this.store.light} />
          <div>{this.store.username}</div>
        </div>
      </Dashboard>
    </Provider>
  }
}
