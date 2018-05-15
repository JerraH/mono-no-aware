//this is our crazy hypochondriac lady

import Character from './character'
import Dialogue from '../Dialogue';

let KIKUE_DIALOGUE = [


export default class Kikue extends Character {
  constructor(config) {
    super(config);
    this.name = 'Kikue';
    this.pronouns = 'She';
    this.dialogue = new Dialogue(KIKUE_DIALOGUE);

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
