import React, { PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import Divider from 'react-md/lib/Dividers'
import moment from 'moment'

@inject('store') @observer
export default class extends PureComponent {
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
    this.props.store.traceIndex = -1
  }
  render() {
    let { store } = this.props
    /*
    return <div className='label'>
      <style jsx>{`
        .label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div style={{width: 50}}>{obj.adContractId}</div>
    </div>
    */
    let result = <div>{`Select a spot to the left to view details`}</div>
    if(store.traceIndex != -1) {
      let obj = store.traceObjs[store.traceIndex]
      result = <div>
        <div style={{
          display: 'flex',
        }}>
          <style jsx>{`
            div {
              flex: 1;
              margin-bottom: 5px;
            }
            label {
              font-size: 12px;
              color: rgba(0,0,0,.54);
            }
          `}</style>
          <div>
            <label>{'Unique Adspot ID'}</label>
            <div>{obj.uniqueAdspotId}</div>
          </div>
          <div>
            <label>{'Broadcaster ID'}</label>
            <div>{obj.broadcasterId}</div>
          </div>
          <div>
            <label>{'Advertiser ID'}</label>
            <div>{obj.advertiserId}</div>
          </div>
        </div>
        <Divider/>
        <div style={{
          display: 'flex',
        }}>
          <style jsx>{`
            div {
              flex: 1;
              margin-bottom: 5px;
            }
            label {
              font-size: 12px;
              color: rgba(0,0,0,.54);
            }
          `}</style>
          <div>
            <label>{'Target Program'}</label>
            <div>{obj.programName}</div>
          </div>
          <div>
            <label>{'Target GRP'}</label>
            <div>{obj.targetGrp}</div>
          </div>
          <div>
            <label>{'Target Demographics'}</label>
            <div>{obj.targetDemographics}</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
        }}>
          <style jsx>{`
            div {
              flex: 1;
              margin-bottom: 5px;
            }
            label {
              font-size: 12px;
              color: rgba(0,0,0,.54);
            }
          `}</style>
          <div>
            <label>{'Actual Program'}</label>
            <div>{obj.actualProgramName}</div>
          </div>
          <div>
            <label>{'Actual GRP'}</label>
            <div>{obj.actualGrp}</div>
          </div>
          <div>
            <label>{'Actual Demographics'}</label>
            <div>{obj.actualDemographics}</div>
          </div>
        </div>
        <Divider/>
        <div style={{
          display: 'flex',
        }}>
          <style jsx>{`
            div {
              flex: 1;
              margin-bottom: 5px;
            }
            label {
              font-size: 12px;
              color: rgba(0,0,0,.54);
            }
          `}</style>
          <div>
            <label>{'Contract Results'}</label>
            <div>
              {obj.contractResults.split('|').map( (cr, i) => {
                return <div key={i}>
                  {cr.split(',').map( (str, j) => {
                    if(cr.split(',').length > 1) {
                      if(j == 0) {
                        str = moment(str, 'YYYY-MM-DD HH:mm Z').format('LLL')
                      }
                    }
                    return <span key={j} style={{marginRight: '4px'}}>
                      {str}
                    </span>
                  })}
                </div>
              })}
              <div>
                {obj.makupAdspotId.length > 0 ? obj.makupAdspotData.map( (md, j) => {
                  return <div key={j}>
                    {md.contractResults.split('|').reverse().map( (mcr, k) => {
                      return <span key={k} style={{marginRight: '4px'}}>
                        {mcr.split(',').map( (str, l) => {
                          if(mcr.split(',').length > 1) {
                            if(l == 0) {
                              str = moment(str, 'YYYY-MM-DD HH:mm Z').format('LLL')
                            }
                          }
                          return <span key={l} style={{marginRight: '4px'}}>
                            {str}
                          </span>
                        })}
                      </span>
                    })}
                  </div>
                }) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    return result
  }
}
