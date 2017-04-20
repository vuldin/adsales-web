import React from 'react'
import D3Chart from './d3Chart'
import { toJS } from 'mobx'
import { initStore } from '../store'

export default class extends React.Component{
  getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return { lastUpdate: store.lastUpdate, isServer }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
    this.d3Chart = new D3Chart()
  }
  componentDidMount() {
    let el = this.refs.chart
    this.d3Chart.create(el, {
      width: '600px',
      height: '250px',
    }, toJS(this.props.move))
  }
  componentDidUpdate() {
    let el = this.refs.chart
    this.d3Chart.update(el, toJS(this.props.move))
    this.store.chartMove = {
      from: [],
      to: [],
    }
  }
  componentWillUnmount() {
    /*
    let el = this.refs.chart
    console.log(el)
    this.d3Chart.destroy(el)
    */
  }
  render() {
    return <div ref='chart' style={{
      paddingTop: '8px',
    }}/>
  }
}
