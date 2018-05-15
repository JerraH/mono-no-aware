import Character from './character'
import Dialogue from '../Dialogue';

let TWINS_DIALOGUE = [
]

export default class Twins extends Character {
  constructor(config) {
    super(config);
    this.name = 'Twins';
    // this.dialogue = new Dialogue(TWINS_DIALOGUE, this);

    // this.state = {
    //   happinessMeter: 50,
    //   inebriationLevel: 0
      // inConversation: false
    // }

    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {x: 10, y: 160};


  }


}
