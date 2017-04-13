import { action, observable } from 'mobx'
import { autorun, toJS } from 'mobx'

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
        primaryText: '1 Release Inventory',
      },
    },
    {
      roles: ['AgencyA'],
      component: {
        key: 2,
        href: '/place',
        primaryText: '2 Place Orders',
      },
    },
    {
      roles: ['AgencyA'],
      component: {
        key: 3,
        href: '/map',
        primaryText: '3 Map Ads',
      },
    },
    {
      roles: ['BroadcasterA'],
      component: {
        key: 4,
        href: '/report',
        primaryText: '4 Report Aired Ads',
      },
    },
    {
      roles: ['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC'],
      component: {
        key: 5,
        href: '/trace',
        primaryText: '5 Trace Ads',
      },
    },
  ]
  //columnWidths = 970
  columnWidths = 1200
  programs = [
    'Dance Competition',
    'Urban Family',
    'Crime Show',
    'Baseball',
    'Breaking News',
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
    'Men 20-60',
  ]
  advertisers = [
    'AdvertiserA',
    'AdvertiserC',
  ]
  campaignNames = [
    'Family Sedan',
    'Sport SUV',
    'Light Beer',
    'IPA',
  ]
  @observable placeObjs = [
  ]
  @observable mapObjs = [
  ]
  @observable reportObjs = [
  ]
  @observable traceObjs = [
  ]
  @observable traceIndex = -1
  apiServer = 'adsales-api-xrayyee-5.mybluemix.net'
  blockchainCount = 427
  @observable blockchain = [
    /*
    {
      id: 123,
      user: 'BroadcasterA',
      type: 'release inventory',
      data: 'data',
    }
    */
  ]

  constructor (isServer, lastUpdate) {
    this.lastUpdate = lastUpdate
    autorun( () => {
      //console.log('autorun')
      //console.log(toJS(this.traceIndex))
    })
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
