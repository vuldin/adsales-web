import { action, observable } from 'mobx'
//import { autorun } from 'mobx'

let store = null

class Store {
  @observable lastUpdate = 0
  @observable light = false
  users = [
    {
      name: 'BroadcasterA',
      role: 'broadcaster',
    },
    {
      name: 'AgencyA',
      role: 'agency',
    },
    {
      name: 'AdvertiserA',
      role: 'advertiser',
    },
    {
      name: 'AdvertiserC',
      role: 'advertiser',
    },
  ]
  @observable username = 'BroadcasterA'
  title = 'Ad Sales'
  toolbarTitle = 'Ad Sales'
  @observable navItems = [
    {
      roles: ['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC'],
      component: {
        key: 0,
        href: '/',
        primaryText: 'Home',
        active: true,
      },
    },
    {
      roles: ['BroadcasterA'],
      component: {
        key: 1,
        href: '/release',
        primaryText: 'Release Inventory',
      },
    },
    {
      roles: ['AgencyA'],
      component: {
        key: 2,
        href: '/place',
        primaryText: 'Place Orders',
      },
    },
    {
      roles: ['AgencyA'],
      component: {
        key: 3,
        href: '/map',
        primaryText: 'Map Ads',
      },
    },
    {
      roles: ['BroadcasterA'],
      component: {
        key: 4,
        href: '/report',
        primaryText: 'Report Aired Ads',
      },
    },
    {
      roles: ['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC'],
      component: {
        key: 5,
        href: '/trace',
        primaryText: 'Trace Ads',
      },
    },
  ]
  columnWidths = 970
  programs = [
    'Dance Competition',
    'Urban Family',
    'Crime Show',
    'Baseball',
    'Cars',
    'Massive Crime Wave',
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
    'Action',
  ]
  demographics = [
    'Women 12 - 55',
    'Men 18 - 54',
    'Men 20 - 40',
  ]
  advertisers = [
    'AdvertiserA',
    'AdvertiserC',
  ]

  constructor (isServer, lastUpdate) {
    this.lastUpdate = lastUpdate
    //autorun( () => console.log(this.username))
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }


  stop = () => clearInterval(this.timer)
}

export function initStore (isServer, lastUpdate = Date.now()) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate)
    }
    return store
  }
}
