import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'

class OrderLabel extends PureComponent {
  render() {
    let { order } = this.props
    return <div className='order-label'>
      <style jsx>{`
        .order-label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div>{order.lotId}</div>
      <div>{order.adspotId}</div>
      <div style={{minWidth: 93}}>{order.targetDemographics}</div>
      <div style={{minWidth: 130}}>{order.programName}</div>
    </div>
  }
}

export default class PlaceOrderForm extends Component {
  render() {
    let { focused, columnWidths } = this.props
    let { order, update } = this.props
    columnWidths = [970] // TODO pass appropriate value to this component
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<OrderLabel order={ order }/>}
    >
      <div>{order.lotId}</div>
      <div>{order.programName}</div>
      <div>{order.broadcasterId}</div>
      <div>{order.genre}</div>
      <div>{order.dayPart}</div>
      <div>{order.targetGrp}</div>
      <div>{order.initialCpm}</div>
      <div>{order.bsrp}</div>
      <div>{order.numberOfSpots}</div>
      <div>{order.orderNumber}</div>
      <SelectField
        id='select-field-advertisers'
        defaultValue={order.advertiserId}
        placeholder='Advertiser'
        menuItems={['AdvertiserA', 'AdvertiserC']}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => {
          update(order.orderNumber, {key: 'advertiserId', val: val})
        }}
      />
      <TextField
        id='text-field-ad-contract'
        label='Ad Contract ID'
        defaultValue={order.adContractId}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => {
          update(order.orderNumber, {key: 'adContractId', val: +val})
        }}
      />
      <TextField
        id='text-field-number-of-spots'
        label='Number of spots'
        defaultValue={order.numberOfSpots}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => {
          update(order.orderNumber, {key: 'numberOfSpots', val: +val})
        }}
      />
    </ExpansionPanel>
  }
}
