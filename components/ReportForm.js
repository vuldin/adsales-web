import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'

class ReportLabel extends PureComponent {
  render() {
    let { spot } = this.props
    return <div className='spot-label'>
      <style jsx>{`
        .spot-label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div>{spot.lotId}</div>
      <div>{spot.adspotId}</div>
      <div style={{minWidth: 93}}>{spot.targetDemographics}</div>
      <div style={{minWidth: 130}}>{spot.programName}</div>
    </div>
  }
}

export default class ReportForm extends Component {
  render() {
    let { focused, columnWidths } = this.props
    let { spot, update } = this.props
    columnWidths = [970] // TODO pass appropriate value to this component
    let items = [
      spot.lotId,
      spot.programName,
      spot.broadcasterId,
      spot.genre,
      spot.dayPart,
      spot.targetGrp,
      spot.initialCpm,
      spot.bsrp,
      spot.numberOfSpots,
      spot.orderNumber,
    ].map( (text, i) => <ListItem key={i} primaryText={text}/> )
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<ReportLabel spot={ spot }/>}
    >
      <List>{items}</List>
      <SelectField
        id='select-field-advertisers'
        defaultValue={spot.advertiserId}
        placeholder='Advertiser'
        menuItems={['AdvertiserA', 'AdvertiserC']}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => {
          update(spot.orderNumber, {key: 'advertiserId', val: val})
        }}
      />
      <TextField
        id='text-field-ad-contract'
        label='Ad Contract ID'
        defaultValue={spot.adContractId}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => {
          update(spot.orderNumber, {key: 'adContractId', val: +val})
        }}
      />
      <TextField
        id='text-field-number-of-spots'
        label='Number of spots'
        defaultValue={spot.numberOfSpots}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => {
          update(spot.orderNumber, {key: 'numberOfSpots', val: +val})
        }}
      />
    </ExpansionPanel>
  }
}
