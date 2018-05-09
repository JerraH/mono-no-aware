import Phaser from 'phaser'
import Zone from './InteractableZone'
import Sign from './Sign'

export default class Item extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "item";
<<<<<<< HEAD
      this.body.immovable = false;
      this.zone = new Zone({scene: this.scene, x: this.x - 100, y: this.y - 100, width: 500, height: 500});
=======
      this.body.immovable = true;
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
>>>>>>> 758460739c0d8f1ad43b66aeb77c6c817b366991
      //origin isn't the same as items origin. Item is centered, zone's origin is top left corner.

    }



    create() {
<<<<<<< HEAD
      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.cat,
        this.zone, this.overlap, null, this.scene)
        this.scene.input.on('dragstart', function (pointer) {

          this.scene.children.bringToTop(this);

      }, this);



    this.scene.input.on('drop', function (pointer, dropZone) {

      console.log('drop');
      console.log(dropZone);

      this.x = dropZone.x;
      this.y = dropZone.y;

      this.input.enabled = false;

  });

  this.scene.input.on('dragend', function (pointer, dropped) {

      console.log('dragend', dropped);

      if (!dropped)
      {
          this.x = this.input.dragStartX;
          this.y = this.input.dragStartY;
      }

  });
=======
      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
        this.zone,
        () => {
            this.setSign(225);
        },
        null, 
        this.scene)
>>>>>>> 758460739c0d8f1ad43b66aeb77c6c817b366991
    }

    setSign(time) {
      this.sign.visible = true;
      this.scene.setUpdatingTimeout(() => {
        this.sign.visible = false;
      }, time, 'triangle')
    }
<<<<<<< HEAD

    update(keys, time, delta) {

    }
  }
=======
    
    update(time, delta) {

    }

  }
>>>>>>> 758460739c0d8f1ad43b66aeb77c6c817b366991
