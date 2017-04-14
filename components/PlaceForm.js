import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import Divider from 'react-md/lib/Dividers'
import { inject, observer } from 'mobx-react'

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

@inject('store') @observer
class Label extends PureComponent {
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
  }
  render() {
    let { store, index } = this.props
    let obj = store.placeObjs[index]
    return <div className='label'>
      <style jsx>{`
        .label {
          display: flex;
        }
      `}</style>
      <div style={{width: 100}}>{obj.adspotId}</div>
      <div style={{width: 165}}>{obj.programName}</div>
      <div style={{width: 145}}>{obj.targetDemographics}</div>
      <div style={{width: 130}}>{obj.numberOfSpots}</div>
      <div style={{width: 130}}>{obj.advertiserId}</div>
      <div style={{width: 200}}>{obj.numberOfSpotsToPurchase}</div>
    </div>
  }
}

@inject('store') @observer
export default class ReleaseForm extends Component {
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
  }
  render() {
    let { focused, store, index } = this.props
    let obj = store.placeObjs[index]
    return <ExpansionPanel
      focused={focused}
      label={<Label index={index}/>}
    >
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
          <label>{'Lot ID'}</label>
          <div>{obj.lotId}</div>
        </div>
        <div>
          <label>{'Adspot ID'}</label>
          <div>{obj.adspotId}</div>
        </div>
        <div>
          <label>{'Program Name'}</label>
          <div>{obj.programName}</div>
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
          <label>{'Day Part'}</label>
          <div>{obj.dayPart}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>{obj.targetGrp}</div>
        </div>
        <div>
          <label>{'Demographic'}</label>
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
          <label>{'Initial CPM'}</label>
          <div>{obj.initialCpm}</div>
        </div>
        <div>
          <label>{'BSRP'}</label>
          <div>{obj.bsrp}</div>
        </div>
        <div>
          <label>{'Number of Spots'}</label>
          <div>{obj.numberOfSpots}</div>
        </div>
      </div>
      <Divider/>
      <TextField
        id='text-field-order-number'
        label='Order Number'
        value={obj.orderNumber}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            let arr = store.placeObjs.map( oldspot => {
              if(oldspot.adspotId == obj.adspotId) {
                obj.orderNumber = val
                return obj
              }
              else return oldspot
            })
            store.placeObjs = arr
          }
        }}
      />
      <SelectField
        id='select-field-advertiser-id'
        value={obj.advertiserId}
        label='Advertiser ID'
        menuItems={store.advertisers}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => {
          let arr = store.placeObjs.map( oldspot => {
            if(oldspot.adspotId == obj.adspotId) {
              obj.advertiserId = val
              return obj
            }
            else return oldspot
          })
          store.placeObjs = arr
        }}
      />
      <TextField
        id='text-field-ad-contract-id'
        label='Ad Contract ID'
        value={obj.adContractId}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            let arr = store.placeObjs.map( oldspot => {
              if(oldspot.adspotId == obj.adspotId) {
                obj.adContractId = val
                return obj
              }
              else return oldspot
            })
            store.placeObjs = arr
          }
        }}
      />
      <Slider
        discrete
        id='slider-reserve-spots'
        defaultValue={+obj.numberOfSpotsToPurchase}
        label={`Number of spots to purchase: ${obj.numberOfSpotsToPurchase}`}
        max={+obj.numberOfSpots}
        step={1}
        discreteTicks={1}
        onChange={ val => {
          //this.setState({ numberOfSpotsToPurchase: val })
          obj.numberOfSpotsToPurchase = `${val}`
        }}
      />
    </ExpansionPanel>
  }
}
