import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
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
    let obj = store.mapObjs[index]
    return <div className='label'>
      <style jsx>{`
        .label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div style={{width: 50}}>{obj.adContractId}</div>
      <div style={{width: 145}}>{obj.campaignName}</div>
      <div style={{width: 105}}>{obj.advertiserId}</div>
      <div style={{width: 130}}>{obj.targetGrp}</div>
      <div style={{width: 130}}>{obj.targetDemographics}</div>
      <div style={{width: 130}}>${obj.initialCpm}</div>
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
    let { focused, columnWidths, store, index } = this.props
    let obj = store.mapObjs[index]
    columnWidths = [store.columnWidths] // TODO pass appropriate value to this component
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
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
          <label>{'Contract ID'}</label>
          <div>{obj.adContractId}</div>
        </div>
        <div>
          <label>{'Advertiser ID'}</label>
          <div>{obj.advertiserId}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>{obj.targetGrp}</div>
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
          <label>{'Target Demographic'}</label>
          <div>{obj.targetDemographics}</div>
        </div>
        <div>
          <label>{'Initial CPM'}</label>
          <div>${obj.initialCpm}</div>
        </div>
      </div>
      <Divider/>
      <SelectField
        id='select-field-campaign'
        value={obj.campaignName}
        label='Campaign Name'
        menuItems={store.campaignNames}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => {
          let arr = store.mapObjs.map( oldspot => {
            if(oldspot.uniqueAdspotId == obj.uniqueAdspotId) {
              obj.campaignName = val
              return obj
            }
            else return oldspot
          })
          store.mapObjs = arr
        }}
      />
    </ExpansionPanel>
  }
}
