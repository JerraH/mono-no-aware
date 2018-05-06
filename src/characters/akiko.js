import Character from './character'

export default class Akiko extends Character {
  constructor(config) {
    super(config);
    this.name = 'Akiko';
    this.pronouns = 'She';
    this.scene = config.scene;
    this.type = config.type;

    this.state = {
      happinessMeter: 50,
      inConversation: false
    }


    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {x: 10, y: 160};


  }


}
