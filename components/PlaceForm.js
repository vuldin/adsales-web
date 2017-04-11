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
      <div style={{width: 50}}>{obj.adspotId}</div>
      <div style={{width: 145}}>{obj.programName}</div>
      <div style={{width: 105}}>{obj.targetDemographics}</div>
      <div style={{width: 130}}>{obj.numberOfSpots}</div>
      <div style={{width: 130}}>{obj.advertiserId}</div>
      <div style={{width: 130}}>{obj.reserveSpots}</div>
    </div>
  }
}

@inject('store') @observer
export default class ReleaseForm extends Component {
  constructor(props) {
    super(props)
    let { obj } = props
    this.state = {
      lotId: `${obj.lotId}`,
      adspotId: `${obj.adspotId}`,
      programName: obj.programName,
      genre: obj.genre,
      dayPart: obj.dayPart,
      targetGrp: `${obj.targetGrp}`,
      targetDemographics: obj.targetDemographics,
      initialCpm: `${obj.initialCpm}`,
      bsrp: `${obj.bsrp}`,
      numberOfSpots: `${obj.numberOfSpots}`,
      orderNumber: `${0}`,
      advertiserId: 'AdvertiserA',
      adContractId: `${0}`,
      reserveSpots: `${0}`,
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
          <label>{'Lot ID'}</label>
          <div>{this.state.lotId}</div>
        </div>
        <div>
          <label>{'Adspot ID'}</label>
          <div>{this.state.adspotId}</div>
        </div>
        <div>
          <label>{'Program Name'}</label>
          <div>{this.state.programName}</div>
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
          <div>{this.state.dayPart}</div>
        </div>
        <div>
          <label>{'Target GRP'}</label>
          <div>{this.state.targetGrp}</div>
        </div>
        <div>
          <label>{'Demographic'}</label>
          <div>{this.state.targetDemographics}</div>
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
          <div>{this.state.initialCpm}</div>
        </div>
        <div>
          <label>{'BSRP'}</label>
          <div>{this.state.bsrp}</div>
        </div>
        <div>
          <label>{'Number of Spots'}</label>
          <div>{this.state.numberOfSpots}</div>
        </div>
      </div>
      <Divider/>
      <TextField
        id='text-field-order-number'
        label='Order Number'
        value={this.state.orderNumber}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            this.setState({ orderNumber: val })
          }
        }}
      />
      <SelectField
        id='select-field-advertiser-id'
        value={this.state.advertiserId}
        label='Advertiser ID'
        menuItems={store.advertisers}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => this.setState({ advertiserId: val }) }
      />
      <TextField
        id='text-field-ad-contract-id'
        label='Ad Contract ID'
        value={this.state.adContractId}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            this.setState({ adContractId: val })
          }
        }}
      />
      <Slider
        discrete
        id='slider-reserve-spots'
        defaultValue={+this.state.reserveSpots}
        label={`Reserve Spots: ${this.state.reserveSpots}`}
        max={+this.state.numberOfSpots}
        step={1}
        discreteTicks={1}
        onChange={ val => {
          this.setState({ reserveSpots: val })
        }}
      />
    </ExpansionPanel>
  }
}
