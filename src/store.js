import { observable, computed } from 'mobx'
import { json } from 'json-mobx'

class Spot {
  constructor(args) {
    Object.assign(this, args)
  }
  @json id = null
  @json lotId = null
  @json program = null
  @json season = null
  @json episode = null
  @json @computed get seasonEpisode() {
    return `${this.season}${this.episode}`
  }
  @json genre = null
  @json timeSlotDescription = null
  @json dayOfWeek = null
  @json @computed get dayPart() {
    return `${this.timeSlotDescription}${this.dayOfWeek}`
  }
  @json targetGRP = null
  @json targetDemographics = null
  @json initialCPM = null
  @json bsrp = null
  @json availableSpots = null
}

export default class {
  welcomeMessage = 'new welcome message!'
  @observable time = (new Date()).getTime()
  @json @observable counter = 0
  @json @observable spots = json.arrayOf(Spot)
  programs = [
    'Dance Competition',
    'Urban Family',
    'Crime Show',
    'Baseball',
  ]
  seasons = [
    'S01',
    'S02',
    'S03',
    'S04',
    'S05',
    'S06',
    'S07',
    'S08',
    'S09',
  ]
  episodes = [
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
  ]
  timeSlotDescriptions = [
    'Prime',
    'Morning',
    'Afternoon',
    'Evening',
    'Weekend',
  ]
  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  genres = [
    'Reality',
    'Sitcom',
    'Drama',
    'Sports',
  ]
  demographics = [
    'Women 18-54',
    'Men 18-54',
    'Men 21-49',
  ]
    /*
  constructor() {
    autorun( () => setInterval(() => {
      this.time = (new Date()).getTime()
    }, 1000 ))
    autorun( () => console.log(toJS(this.spots)))
  }
    */
  incCounter = () => this.counter++
  addSpot = obj => {
    let spot = new Spot({...obj})
    this.spots.push(spot)
  }
}
