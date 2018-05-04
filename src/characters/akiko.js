import {default as Character} from './character'


/**
 * Fox lady
 */


export default class Akiko extends Character {
  constructor(config) {
    super(config);
    this.state = {
      happinessMeter: 50,
      inConversation: false
    }

  }



}
// export default Akiko;
