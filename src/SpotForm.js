import React, { Component } from 'react'
import './App.scss'
import { Card } from 'react-md/lib/Cards'
import Button from 'react-md/lib/Buttons'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import Slider from 'react-md/lib/Sliders'

let getRandomId = () => {
  let min = Math.ceil(99999)
  let max = Math.floor(10000)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class SelectForm extends Component {
  constructor() {
    super()
    this.state = {
      id: getRandomId(),
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
    }
  }
  render() {
    let store = this.props.store
    return <Card className='md-cell md-cell--12 md-grid'>
      <TextField
        id='text-field-id'
        label='Spot ID'
        defaultValue={this.state.id}
        className='md-cell md-cell--bottom'
        disabled
      />
      <TextField
        id='text-field-lot-id'
        label='Lot ID'
        defaultValue='1000'
        className='md-cell md-cell--bottom'
        lineDirection='right'
        onChange={val => this.setState({lotId: +val})}
      />
      <SelectField
        id='select-field-programs'
        placeholder='Program'
        menuItems={store.programs}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({program: val})}
      />
      <SelectField
        id='select-field-seasons'
        placeholder='Season'
        menuItems={store.seasons}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({season: val})}
      />
      <SelectField
        id='select-field-episodes'
        placeholder='Episode'
        menuItems={store.episodes}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({episode: val})}
      />
      <SelectField
        id='select-field-genres'
        placeholder='Genre'
        menuItems={store.genres}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({genre: val})}
      />
      <SelectField
        id='select-field-time-slot-descriptions'
        placeholder='Time Slot Description'
        menuItems={store.timeSlotDescriptions}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({timeSlotDescription: val})}
      />
      <SelectField
        id='select-field-days-of-week'
        placeholder='Day of Week'
        menuItems={store.daysOfWeek}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({dayOfWeek: val})}
      />
      <Slider
        discrete
        id='discreteGRP'
        defaultValue={1.00}
        label='Target GRP'
        max={5.00}
        step={0.10}
        discreteTicks={0.10}
        valuePrecision={2}
        onChange={val => this.setState({targetGRP: val})}
      />
      <SelectField
        id='select-field-demographics'
        placeholder='Target Demographics'
        menuItems={store.demographics}
        position={SelectField.Positions.BELOW}
        className='md-cell'
        onChange={val => this.setState({targetDemographics: val})}
      />
      <Slider
        discrete
        id='discreteCPM'
        defaultValue={1.00}
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
        defaultValue='0.0'
        className='md-cell'
        onChange={val => this.setState({bsrp: +val})}
      />
      <Slider
        discrete
        id='discreteAvailableSpots'
        defaultValue={1}
        label='Available Spots'
        max={9}
        step={1}
        discreteTicks={1}
        valuePrecision={1}
        onChange={val => this.setState({availableSpots: val})}
      />
      <Button raised primary label='Submit' onClick={() => {
        store.addSpot(this.state)
        this.setState({
          id: getRandomId(),
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
        })
      }}/>
    </Card>
  }
}

export default SelectForm
