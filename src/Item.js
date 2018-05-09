import Phaser from 'phaser'
import Zone from './InteractableZone'
import Sign from './Sign'

export default class Item extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "item";
      this.body.immovable = true;
      this.name = this.texture.key;
      this.sign = new Sign({
        scene: this.scene,
        x: this.x,
        y: this.y - (this.body.sourceHeight/2),
        texture: 'triangle'
      });
      this.zone = new Zone({
        scene: this.scene,
        x: this.x - (this.body.sourceWidth * .75), 
        y: this.y - (this.body.sourceHeight * .75), 
        width: this.body.sourceWidth * 1.5, 
        height: this.body.sourceHeight * 1.5
      });
      //origin isn't the same as items origin. Item is centered, zone's origin is top left corner.
    }  

    create() {
      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
        this.zone,
        () => {
            this.setSign(225);
        },
        null, 
        this.scene)
    }

    setSign(time) {
      this.sign.visible = true;
      this.scene.setUpdatingTimeout(() => {
        this.sign.visible = false;
      }, time, 'triangle')
    }
    
    update(time, delta) {

    }

  }