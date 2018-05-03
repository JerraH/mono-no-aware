import {Character} from './character'
import Phaser, {Class} from 'phaser';


const Akiko = new Character( {
  initialize:

  function Akiko(scene, x, y, type)
  {

    Character.call(scene, x, y, type);
    this.scene = scene;
    this.type = type;
    this.setPosition(x, y);
    this.setScale(.5)
  }


})
export default Akiko;
