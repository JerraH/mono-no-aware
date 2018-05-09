import Character from './character'
import Dialogue from '../Dialogue';

let AKIKO_DIALOGUE = {
    name: 'Akiko',
    textFrom: "Can I help you with something?",
    responses: [{
        textTo: "Yes, you definitely can!",
        next: {
            textFrom: "I like your optimism",
            responses: [{
                textTo: "Cool.",
                madeHappy: 20,
                next: {
                    textFrom: "We'll make a great team.",
                }
            }, {
                textTo: "Whatever.",
                madeHappy: -10,
                next: {
                    textFrom: "A slacker, eh?"
                }
            }]
        }
    }, {
        textTo: "Naw, boo"
    }]
}

export default class Akiko extends Character {
  constructor(config) {
    super(config);
    this.name = 'Akiko';
    this.pronouns = 'She';
    this.dialogue = new Dialogue(AKIKO_DIALOGUE, this);

    this.state = {
      happinessMeter: 50
      // inConversation: false
    }

    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {x: 10, y: 160};


  }


}
