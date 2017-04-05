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
