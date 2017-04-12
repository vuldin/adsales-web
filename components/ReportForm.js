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
    let obj = store.reportObjs[index]
    return <div className='label'>
      <style jsx>{`
        .label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div style={{width: 150}}>{obj.uniqueAdspotId}</div>
      <div style={{width: 200}}>{obj.adspotId == -1 ? 'Reserved for makeup' : obj.adspotId}</div>
      <div style={{width: 145}}>{obj.adContractId == -1 ? '' : obj.adContractId}</div>
      <div style={{width: 105}}>{obj.campaignName}</div>
      <div style={{width: 150}}>{obj.programName}</div>
      <div style={{width: 130}}>{obj.targetGrp}</div>
      <div style={{width: 150}}>{obj.targetDemographics}</div>
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
    let obj = store.reportObjs[index]
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
          <label>{'Unique Adspot ID'}</label>
          <div>{obj.uniqueAdspotId}</div>
        </div>
        <div>
          <label>{'Adspot ID'}</label>
          <div>{obj.adspotId}</div>
        </div>
        <div>
          <label>{'Ad Contract ID'}</label>
          <div>{obj.adContractId}</div>
        </div>
        <div>
          <label>{'Campaign Name'}</label>
          <div>{obj.campaignName}</div>
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
          <label>{'Program Name'}</label>
          <div>{obj.programName}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>${obj.targetGrp}</div>
        </div>
        <div>
          <label>{'Target Demographic'}</label>
          <div>${obj.targetDemographics}</div>
        </div>
      </div>
      <Divider/>
      <TextField
        id='text-field-actual-grp'
        label='Actual GRP'
        value={obj.actualGrp}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            let arr = store.reportObjs.map( oldspot => {
              if(oldspot.uniqueAdspotId == obj.uniqueAdspotId) {
                obj.actualGrp = val
                return obj
              }
              else return oldspot
            })
            store.reportObjs = arr
          }
        }}
      />
      <TextField
        id='text-field-program-name'
        label='Program Name'
        value={obj.programName}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          let arr = store.reportObjs.map( oldspot => {
            if(oldspot.uniqueAdspotId == obj.uniqueAdspotId) {
              obj.programName = val
              return obj
            }
            else return oldspot
          })
          store.reportObjs = arr
        }}
      />
      <SelectField
        id='select-field-actual-demographic'
        value={obj.actualDemographic}
        label='Actual Demographics'
        menuItems={store.demographics}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => {
          let arr = store.reportObjs.map( oldspot => {
            if(oldspot.uniqueAdspotId == obj.uniqueAdspotId) {
              obj.actualDemographics = val
              return obj
            }
            else return oldspot
          })
          store.reportObjs = arr
        }}
      />
      <TextField
        id='text-field-makeup-adspot-id'
        label='Makeup Adspot ID'
        value={obj.makeupAdspotId}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            let arr = store.reportObjs.map( oldspot => {
              if(oldspot.uniqueAdspotId == obj.uniqueAdspotId) {
                obj.makeupAdspotId = val
                return obj
              }
              else return oldspot
            })
            store.reportObjs = arr
          }
        }}
      />
    </ExpansionPanel>
  }
}
