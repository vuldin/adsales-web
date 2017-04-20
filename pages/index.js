import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Dashboard from '../components/Dashboard'
//import map from '../lib/map'
import { observer } from 'mobx-react'
import Paper from 'react-md/lib/Papers'
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryStack, VictoryBar, VictoryPie } from 'victory'

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
        <style jsx global>{`
          .paper {
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            background-color: #3f51b5;
            color: #fff;
            width: 140px;
            height: 70px;
          }
          .label {
            color: rgba(0,0,0,.54);
            height: 25px;
          }
        `}</style>
        {/*
        <div
          ref='map'
          style={{
            width: '700px',
            height: '400px',
          }}
        />
        */}
        <div
          style={{
            display: 'flex',
            paddingTop: '8px',
          }}
        >
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
          }}>
            <div className='label'>Last week</div>
            <Paper className='paper' zDepth={1}>
              <div>{'Previous blocks'}</div>
              <div>{`Count: ${this.store.blockchainCount}`}</div>
            </Paper>
          </div>
          {this.store.blockchain.map( (bc, i) => <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              width: '30px',
              height: '2px',
              backgroundColor: '#3f51b5',
            }}/>
            <div style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}>
              <div className='label'>{this.store.blockchainCount + i + 1}</div>
              <Paper className='paper' zDepth={1}>
                <div>{bc.id}</div>
                <div>{bc.user}</div>
                <div>{bc.type}</div>
              </Paper>
            </div>
          </div>)}
        </div>
        <div style={{
          display: 'flex',
        }}>
          <div style={{width: `${800/3}px`, height: '250px'}}>
            <VictoryPie
              theme={VictoryTheme.material}
              width={800 / 3}
              height={250}
            />
          </div>
          <div style={{width: `${800/3}px`, height: '250px'}}>
            <VictoryPie
              theme={VictoryTheme.material}
              width={800 / 3}
              height={250}
            />
          </div>
          <div style={{width: `${800/3}px`, height: '250px'}}>
            <VictoryPie
              theme={VictoryTheme.material}
              width={800 / 3}
              height={250}
            />
          </div>
        </div>
        <div style={{width: '800px', height: '250px'}}>
          <VictoryChart
            theme={VictoryTheme.material}
            responsive={false}
            width={800}
            height={250}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryStack
              colorScale={"warm"}
            >
              <VictoryBar
                data={this.store.barchartData2012}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                data={this.store.barchartData2013}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                data={this.store.barchartData2014}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                data={this.store.barchartData2015}
                x="quarter"
                y="earnings"
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      </Dashboard>
    </Provider>
  }
}
