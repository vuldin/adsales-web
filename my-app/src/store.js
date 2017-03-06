import { observable } from 'mobx'
import { json } from 'json-mobx'

export default class {
  welcomeMessage = 'new welcome message!'
  @observable time = (new Date()).getTime()
  @json @observable counter = 0
  /*
  constructor() {
    autorun( () => setInterval(() => {
      this.time = (new Date()).getTime()
    }, 1000 ))
  }
  */
  incCounter = () => this.counter++
}
