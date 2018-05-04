import Character from './character'

export default class Twins extends Character {
    constructor(config) {
      super(config);
      this.state = {
        happinessMeter: 50,
        inConversation: false
      }

    }
}
