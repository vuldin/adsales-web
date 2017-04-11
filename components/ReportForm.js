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

class Label extends PureComponent {
  render() {
    let { obj } = this.props
    return <div className='label'>
      <style jsx>{`
        .label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div style={{width: 50}}>{obj.uniqueAdspotId}</div>
      <div style={{width: 50}}>{obj.adspotId}</div>
      <div style={{width: 145}}>{obj.adContractId}</div>
      <div style={{width: 105}}>{obj.campaignName}</div>
      <div style={{width: 105}}>{obj.programName}</div>
      <div style={{width: 130}}>{obj.targetGrp}</div>
      <div style={{width: 130}}>${obj.targetDemographics}</div>
      <div style={{width: 130}}>{obj.actualGrp}</div>
      <div style={{width: 130}}>{obj.actualProgramName}</div>
      <div style={{width: 130}}>{obj.actualDemographics}</div>
      <div style={{width: 130}}>{obj.makeupAdspotId}</div>
    </div>
  }
}

@inject('store') @observer
export default class ReleaseForm extends Component {
  constructor(props) {
    super(props)
    let { obj } = props
    this.state = {
      uniqueAd: `${obj.uniqueAdspotId}`,
      adspotId: `${obj.adspotId}`,
      adContractId: `${obj.adContractId}`,
      campaignName: obj.campaignName,
      programName: obj.programName,
      targetGrp: `${obj.targetGrp}`,
      targetDemographics: obj.targetDemographics,
      actualGrp: `${obj.actualGrp}`,
      actualProgramName: obj.actualProgramName,
      actualDemographics: obj.actualDemographics,
      makeupAdspotId: `${obj.makeupAdspotId}`,
    }
  }
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
  }
  render() {
    let { obj, focused, columnWidths, store, update } = this.props
    columnWidths = [store.columnWidths] // TODO pass appropriate value to this component
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<Label obj={this.state}/>}
      onExpandToggle={ expanded => {
        if(!expanded) update(this.state)
      }}
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
          <div>{this.state.uniqueAdspotId}</div>
        </div>
        <div>
          <label>{'Adspot ID'}</label>
          <div>{this.state.adspotId}</div>
        </div>
        <div>
          <label>{'Ad Contract ID'}</label>
          <div>{this.state.adContractId}</div>
        </div>
        <div>
          <label>{'Campaign Name'}</label>
          <div>{this.state.campaignName}</div>
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
          <div>{this.state.programName}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>${this.state.targetGrp}</div>
        </div>
        <div>
          <label>{'Target Demographic'}</label>
          <div>${this.state.targetDemographics}</div>
        </div>
      </div>
      <Divider/>
      <TextField
        id='text-field-actual-grp'
        label='Actual GRP'
        value={this.state.actualGrp}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) this.setState({ actualGrp: val })
        }}
      />
      <TextField
        id='text-field-program-name'
        label='Program Name'
        value={this.state.programName}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          this.setState({ programName: val })
        }}
      />
      <TextField
        id='text-field-actual-demographic'
        label='Actual Demographic'
        value={this.state.actualDemographic}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          this.setState({ actualDemographics: val })
        }}
      />
      <TextField
        id='text-field-makeup-adspot-id'
        label='Makeup Adspot ID'
        value={this.state.makeupAdspotId}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) this.setState({ makeupAdspotId: val })
        }}
      />
    </ExpansionPanel>
  }
}
