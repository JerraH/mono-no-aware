import {Character} from './character'
import Phaser, {Class} from 'phaser';
import Character from './character'

export default class Akiko extends Character {
  constructor(config) {
    super(config);
    this.state = {
      happinessMeter: 50,
      inConversation: false
    }








  }
  create() {
    this.checkCollision()

  } update() {
    this.checkCollision()
  }



}
