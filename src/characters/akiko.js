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
    this.hitbox = new Phaser.Geom.Rectangle(this.height / 4, this.width / 2, this.height / 3, this.width)
    this.hitbox.immovable = true;
    this.hitbox.blocked = {none: false, up: true, down: true, left: true, right: true}
    this.hitbox.onCollide = true
    // console.log(this.hitbox)
    // this.checkCollision()
    // this.setInteractive(this.hitbox, this.startConversation)
    // this.frame = {cutHeight: 50, cutWidth: 192}








  }
  create() {


  } update() {
    // this.checkCollision()
  }



}
