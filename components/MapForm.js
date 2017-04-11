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
  constructor(props) {
    super(props)
    let { obj } = props
    this.state = {
      adspotId: `${obj.adContractId}`,
      programName: obj.campaignName,
      genre: obj.advertiserId,
      targetGrp: `${obj.targetGrp}`,
      targetDemographics: obj.targetDemographics,
      initialCpm: `${obj.initialCpm}`,
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
          <label>{'Contract ID'}</label>
          <div>{this.state.adContractId}</div>
        </div>
        <div>
          <label>{'Advertiser ID'}</label>
          <div>{this.state.advertiserId}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>{this.state.targetGrp}</div>
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
          <div>{this.state.targetDemographics}</div>
        </div>
        <div>
          <label>{'Initial CPM'}</label>
          <div>${this.state.initialCpm}</div>
        </div>
      </div>
      <Divider/>
      <TextField
        id='text-field-campaign'
        label='Campaign Name'
        value={this.state.campaignName}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          this.setState({ campaignName: val })
        }}
      />
    </ExpansionPanel>
  }
}
