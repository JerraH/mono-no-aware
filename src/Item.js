import Phaser from 'phaser'
import Zone from './InteractableZone'

export default class Item extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "item";
      this.body.immovable = true;
      this.zone = new Zone({scene: this.scene, x: this.x - 100, y: this.y - 100, width: 500, height: 500});
      //origin isn't the same as items origin. Item is centered, zone's origin is top left corner.
    }  

    create() {
      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.cat,
        this.zone, this.overlap, null, this.scene)
    }

    overlap() {
      console.log('Overlap!!!')
    }
    
    update(keys, time, delta) {

    }
  }