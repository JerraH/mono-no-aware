import {default as Character} from './character'
import Phaser from 'phaser'


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

    console.log(this.characterMap)





  }
  create() {
    this.checkCollision()

  } update() {
    this.checkCollision()
  }



}
// export default Akiko;
