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
      <div>{order.id}</div>
      <div style={{minWidth: 93}}>{order.targetDemographics}</div>
      <div style={{minWidth: 130}}>{order.program}</div>
    </div>
  }
}

export default class PlaceOrderForm extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      lotId: 1000,
      program: null,
      season: null,
      episode: null,
      genre: null,
      timeSlotDescription: null,
      dayOfWeek: null,
      targetGRP: null,
      targetDemographics: null,
      initialCPM: null,
      bsrp: null,
      availableSpots: null,
      reserveSpots: null,
    }
  }
  render() {
    let { order, focused, columnWidths } = this.props
    console.log(order)
    columnWidths = [970] // TODO pass appropriate value to this component
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<OrderLabel order={ order }/>}
    >
      <TextField
        id='text-field-id'
        label='Spot ID'
        defaultValue={order.id}
        className='md-cell md-cell--bottom'
        disabled
      />
      <TextField
        id='text-field-lot-id'
        label='Lot ID'
        defaultValue={order.lotId}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => this.setState({lotId: +val})}
      />
      <SelectField
        id='select-field-programs'
        defaultValue={order.program}
        placeholder='Program'
        menuItems={store.programs}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({program: val})}
      />
      <SelectField
        id='select-field-seasons'
        defaultValue={order.season}
        placeholder='Season'
        menuItems={store.seasons}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({season: val})}
      />
      <SelectField
        id='select-field-episodes'
        defaultValue={order.episode}
        placeholder='Episode'
        menuItems={store.episodes}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({episode: val})}
      />
      <SelectField
        id='select-field-genres'
        defaultValue={order.genre}
        placeholder='Genre'
        menuItems={store.genres}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({genre: val})}
      />
      <SelectField
        id='select-field-time-slot-descriptions'
        defaultValue={order.timeSlotDescription}
        placeholder='Time Slot Description'
        menuItems={store.timeSlotDescriptions}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({timeSlotDescription: val})}
      />
      <SelectField
        id='select-field-days-of-week'
        defaultValue={order.dayOfWeek}
        placeholder='Day of Week'
        menuItems={store.daysOfWeek}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({dayOfWeek: val})}
      />
      <Slider
        discrete
        id='discreteGRP'
        defaultValue={order.targetGRP}
        label='Target GRP'
        max={5.00}
        step={0.10}
        discreteTicks={0.10}
        valuePrecision={2}
        onChange={val => this.setState({targetGRP: val})}
      />
      <SelectField
        id='select-field-demographics'
        defaultValue={order.targetDemographics}
        placeholder='Target Demographics'
        menuItems={store.demographics}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({targetDemographics: val})}
      />
      <Slider
        discrete
        id='discreteCPM'
        defaultValue={order.initialCPM}
        label='Initial CPM'
        max={5.00}
        step={0.25}
        discreteTicks={0.25}
        valuePrecision={2}
        onChange={val => this.setState({initialCPM: val})}
      />
      <TextField
        id='text-field-bsrp'
        label='BSRP'
        defaultValue={order.bsrp}
        className='md-cell'
        onChange={val => this.setState({bsrp: +val})}
      />
      <Slider
        discrete
        id='discreteAvailableSpots'
        defaultValue={order.availableSpots}
        label='Available Spots'
        max={9}
        step={1}
        discreteTicks={1}
        valuePrecision={1}
        onChange={val => this.setState({availableSpots: val})}
      />
      <Slider
        discrete
        id='reserveSpots'
        defaultValue={order.reserveSpots}
        label='Reserve Spots'
        max={9}
        step={1}
        discreteTicks={1}
        valuePrecision={1}
        onChange={val => this.setState({reserveSpots: val})}
      />
    </ExpansionPanel>
  }
}

const store = {
  programs: [
    'Dance Competition',
    'Urban Family',
    'Crime Show',
    'Baseball',
  ],
  seasons: [
    'S01',
    'S02',
    'S03',
    'S04',
    'S05',
    'S06',
    'S07',
    'S08',
    'S09',
  ],
  episodes: [
    'E01',
    'E02',
    'E03',
    'E04',
    'E05',
    'E06',
    'E07',
    'E08',
    'E09',
    'E10',
    'E11',
    'E12',
    'E13',
  ],
  timeSlotDescriptions: [
    'Prime',
    'Morning',
    'Afternoon',
    'Evening',
    'Weekend',
  ],
  daysOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  genres: [
    'Reality',
    'Sitcom',
    'Drama',
    'Sports',
  ],
  demographics: [
    'Women 18-54',
    'Men 18-54',
    'Men 21-49',
  ],
}
