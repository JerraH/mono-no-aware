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
    this.protag = this.scene.protag;

    this.body.height = 20
    this.body.width = 120
    this.body.offset = {x: 10, y: 160};











  }
  // preload() {

  // }
  // create() {



  // }
  // update(){
  //   this.scene.physics.world.collide(this, this.scene.protag, this.startConversation);

  // }



}
