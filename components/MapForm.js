import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'

class MapLabel extends PureComponent {
  render() {
    let { obj } = this.props
    return <div className='map-label'>
      <style jsx>{`
        .map-label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div>{obj.lotId}</div>
      <div>{obj.id}</div>
      <div style={{minWidth: 93}}>{obj.targetDemographics}</div>
      <div style={{minWidth: 130}}>{obj.program}</div>
    </div>
  }
}

export default class MapForm extends Component {
  render() {
    let { obj, update, focused, columnWidths } = this.props
    console.log('MapForm render')
    console.log(obj)
    columnWidths = [970] // TODO pass appropriate value to this component
    let items = [
      obj.uniqueAdspotId,
      obj.broadcasterId,
      obj.adContractId,
      obj.campaignName,
      obj.advertiserId,
      obj.targetGrp,
      obj.targetDemographics,
      obj.initialCpm,
    ].map( (text, i) => <ListItem key={i} primaryText={text}/> )
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<MapLabel obj={obj}/>}
    >
      <List>{items}</List>
      <TextField
        id='text-field-campaign'
        label='Campaign'
        defaultValue={obj.campaign}
        className='md-cell md-cell--bottom'
      />
      <TextField
        id='text-field-advertiser'
        label='Advertiser'
        defaultValue={obj.advertiser}
        className='md-cell md-cell--bottom'
      />
    </ExpansionPanel>
  }
}
