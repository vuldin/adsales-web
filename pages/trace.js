import React from 'react'
import Dashboard from '../components/Dashboard'
import request from 'superagent'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import TraceForm from '../components/TraceForm'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

const viewportToPixel = val => {
  let percent = val.match(/[\d.]+/)[0] / 100
  let unit = val.match(/[vwh]+/)[0]
  return (unit == 'vh' ? window.innerHeight : window.innerWidth) * percent
}

export default class extends React.PureComponent {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    let data = {
      userId: store.username,
    }
    data = JSON.stringify(data)
    let orders = await request
      .post(`//${store.apiServer}/querytraceadspots`)
      .type('form')
      .send({
        data: data,
      })
    orders = JSON.parse(orders.text)
    store.traceObjs = orders
    return { orders, lastUpdate: store.lastUpdate, isServer }
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
  render() {
    let headerHeight = 80
    let columnWidth = 100
    return <Provider store={this.store}>
      <Dashboard>
        <div style={{
          display: 'flex',
        }}>
          <div>
            <DataTable plain>
              <TableHeader style={{
                position: 'fixed',
                backgroundColor: '#fafafa',
              }}>
                <TableRow>
                  <TableColumn style={{
                    height: `${headerHeight}px`,
                    width: `${columnWidth}px`,
                  }}>Spots</TableColumn>
                </TableRow>
              </TableHeader>
              <div style={{
                  marginTop: `${headerHeight}px`,
              }}>
                <TableBody>
                  {this.store.traceObjs.map( (spot, i) => <TableRow key={i}>
                    <TableColumn
                      style={{
                        width: `${columnWidth}px`,
                      }}
                      onClick={ () => {
                        this.store.traceIndex = i
                      }}
                    >{spot.uniqueAdspotId}</TableColumn>
                  </TableRow>)}
                </TableBody>
              </div>
            </DataTable>
          </div>
          <div style={{
            display: 'flex',
            marginLeft: `8px`,
            //justifyContent: this.store.traceIndex == -1 ? 'center' : 'flex-start',
            flex: '1 1 100%',
          }}>
            <div style={{
              position: 'fixed',
              width: `${viewportToPixel('100vw') - (256 + 100 + 8 + 8 + 8) }px`
            }}>
              <TraceForm/>
            </div>
          </div>
        </div>
      </Dashboard>
    </Provider>
  }
}
