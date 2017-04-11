import React, { PureComponent, Component } from 'react'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
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
      <div style={{width: 130}}>{obj.numberReservedSpots}</div>
      <div style={{width: 130}}>{obj.numberOfSpots}</div>
    </div>
  }
}

@inject('store') @observer
export default class ReleaseForm extends Component {
  constructor(props) {
    super(props)
    let { obj } = props
    this.state = {
      adspotId: obj.adspotId,
      programName: obj.programName,
      seasonEpisode: obj.seasonEpisode,
      genre: obj.genre,
      dayPart: obj.dayPart,
      part: obj.dayPart.split(' ')[0],
      day: obj.dayPart.split(' ')[1],
      targetGrp: obj.targetGrp,
      targetDemographics: obj.targetDemographics,
      initialCpm: obj.initialCpm,
      bsrp: obj.bsrp,
      numberOfSpots: obj.numberOfSpots,
      numberReservedSpots: obj.numberReservedSpots,
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
    let reserveSlider = <Slider
      discrete
      id='Reserves'
      value={+this.state.numberReservedSpots}
      label={`Reserved Spots: ${this.state.numberReservedSpots}`}
      max={10}
      step={1}
      discreteTicks={1}
      valuePrecision={1}
      onChange={ val => {
        this.setState({ numberReservedSpots: `${val}` })
      }}
    />
    return <ExpansionPanel
      focused={focused}
      columnWidths={columnWidths}
      label={<Label obj={this.state}/>}
      onExpandToggle={ expanded => {
        if(!expanded) update(this.state)
      }}
    >
      <TextField
        id='text-field-id'
        label='Spot ID'
        value={this.state.adspotId}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) this.setState({ adspotId: val })
        }}
      />
      <SelectField
        id='select-field-programs'
        value={this.state.programName}
        label='Program'
        menuItems={store.programs}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => this.setState({ programName: val }) }
      />
      <TextField
        id='select-field-seasons'
        label='Season/Episode (ex. s02e04)'
        value={this.state.seasonEpisode}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => this.setState({ seasonEpisode: val }) }
      />
      <SelectField
        id='select-field-genres'
        value={this.state.genre}
        label='Genre'
        menuItems={store.genres}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => this.setState({ genre: val }) }
      />
      <SelectField
        id='select-field-time-slot-descriptions'
        defaultValue={this.state.part}
        label='Time Slot Description'
        menuItems={store.timeSlotDescriptions}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => {
          this.setState({
            dayPart: `${val} ${this.state.day}`
          })
        }}
      />
      <SelectField
        id='select-field-days-of-week'
        defaultValue={this.state.day}
        label='Day of Week'
        menuItems={store.daysOfWeek}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => {
          this.setState({
            dayPart: `${this.state.part} ${val}`
          })
        }}
      />
      <Slider
        discrete
        id='slider-target-grp'
        defaultValue={+this.state.targetGrp}
        label={`Target GRP: ${this.state.targetGrp}`}
        max={5.00}
        step={0.1}
        discreteTicks={0.1}
        valuePrecision={1}
        onChange={ val => {
          this.setState({ targetGrp: `${val.toFixed(2)}` })
        }}
      />
      <SelectField
        id='select-field-demographics'
        defaultValue={this.state.targetDemographics}
        label='Target Demographics'
        menuItems={store.demographics}
        position={SelectField.Positions.BELOW}
        className='md-cell md-cell--top'
        onChange={ val => this.setState({targetDemographics: val}) }
      />
      <Slider
        discrete
        id='slider-initial-cpm'
        defaultValue={+this.state.initialCpm}
        label='Initial CPM'
        label={`Initial CPM: ${this.state.initialCpm}`}
        max={5.00}
        step={0.01}
        discreteTicks={0.01}
        valuePrecision={2}
        onChange={ val => {
          this.setState({ initialCpm: `${val.toFixed(3)}` })
        }}
      />
      <TextField
        id='text-field-bsrp'
        label='BSRP'
        value={this.state.bsrp}
        floating
        fullWidth={false}
        className='md-cell md-cell--top'
        onChange={ val => {
          if(isNumeric(val)) {
            this.setState({ bsrp: val.toFixed(2) })
          }
        }}
      />
      <Slider
        discrete
        id='slider-number-spots'
        defaultValue={+this.state.numberOfSpots}
        label={`Available Spots: ${this.state.numberOfSpots}`}
        max={9}
        step={1}
        discreteTicks={1}
        valuePrecision={1}
        onChange={ val => {
          this.setState({ numberOfSpots: `${val}` })
          //reserveSlider.forceUpdate( () => console.log('updated'))
        }}
      />
      {reserveSlider}
    </ExpansionPanel>
  }
}
