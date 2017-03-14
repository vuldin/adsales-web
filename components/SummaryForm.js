import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'

class SummaryLabel extends PureComponent {
  render() {
    let { summary} = this.props
    return <div className='summary-label'>
      <style jsx>{`
        .summary-label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <div>{summary.lotId}</div>
      <div>{summary.id}</div>
      <div style={{minWidth: 93}}>{summary.targetDemographics}</div>
      <div style={{minWidth: 130}}>{summary.program}</div>
    </div>
  }
}

export default class SummaryForm extends Component {
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
    let { summary, focused, columnWidths } = this.props
    columnWidths = [970] // TODO pass appropriate value to this component
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<SummaryLabel summary={summary}/>}
    >
      <TextField
        id='text-field-id'
        label='Spot ID'
        defaultValue={summary.id}
        className='md-cell md-cell--bottom'
        disabled
      />
      <TextField
        id='text-field-lot-id'
        label='Lot ID'
        defaultValue={summary.lotId}
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => this.setState({lotId: +val})}
      />
      <SelectField
        id='select-field-programs'
        defaultValue={summary.program}
        placeholder='Program'
        menuItems={store.programs}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({program: val})}
      />
      <SelectField
        id='select-field-seasons'
        defaultValue={summary.season}
        placeholder='Season'
        menuItems={store.seasons}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({season: val})}
      />
      <SelectField
        id='select-field-episodes'
        defaultValue={summary.episode}
        placeholder='Episode'
        menuItems={store.episodes}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({episode: val})}
      />
      <SelectField
        id='select-field-genres'
        defaultValue={summary.genre}
        placeholder='Genre'
        menuItems={store.genres}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({genre: val})}
      />
      <SelectField
        id='select-field-time-slot-descriptions'
        defaultValue={summary.timeSlotDescription}
        placeholder='Time Slot Description'
        menuItems={store.timeSlotDescriptions}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({timeSlotDescription: val})}
      />
      <SelectField
        id='select-field-days-of-week'
        defaultValue={summary.dayOfWeek}
        placeholder='Day of Week'
        menuItems={store.daysOfWeek}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({dayOfWeek: val})}
      />
      <Slider
        discrete
        id='discreteGRP'
        defaultValue={summary.targetGRP}
        label='Target GRP'
        max={5.00}
        step={0.10}
        discreteTicks={0.10}
        valuePrecision={2}
        onChange={val => this.setState({targetGRP: val})}
      />
      <SelectField
        id='select-field-demographics'
        defaultValue={summary.targetDemographics}
        placeholder='Target Demographics'
        menuItems={store.demographics}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({targetDemographics: val})}
      />
      <Slider
        discrete
        id='discreteCPM'
        defaultValue={summary.initialCPM}
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
        defaultValue={summary.bsrp}
        className='md-cell'
        onChange={val => this.setState({bsrp: +val})}
      />
      <Slider
        discrete
        id='discreteAvailableSpots'
        defaultValue={summary.availableSpots}
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
        defaultValue={summary.reserveSpots}
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
