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
      this.name = '';
      this.description = '';
      this.id = null;
    }

    create({name, description, id, scale}) {
      this.name = name;
      this.description = description;
      this.id = id;
      this.scaleX = this.scaleY = scale;

      this.sign = new Sign({
        scene: this.scene,
        x: this.x,
        y: this.y - (this.body.sourceHeight/2),
        texture: 'triangle'
      });
      this.sign.setDepth(3000);
      this.zone = new Zone({
        scene: this.scene,
        x: this.x - (this.body.sourceWidth * scale * .75),
        y: this.y - (this.body.sourceHeight * scale * .75),
        width: this.body.sourceWidth * scale * 1.5,
        height: this.body.sourceHeight * scale * 1.5
      });//origin isn't the same as items origin. Item is centered, zone's origin is top left corner.

      this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
        this.zone,
        () => {
            this.setSign(225);
        },
        () => {
          if(this.visible) {//if item was picked up, you can't interact with it's zone any more
            return true;//Item is set to invisible on pick up (happens in InteractionScene.js)
          } else {
            return false;
          }
        }, 
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


  //   create() {
  //     this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
  //       this.zone, this.overlap, null, this.scene)
  //       this.scene.input.on('dragstart', function (pointer) {

  //         this.scene.children.bringToTop(this);

  //     }, this);



  //   this.scene.input.on('drop', function (pointer, dropZone) {

  //     console.log('drop');
  //     console.log(dropZone);

  //     this.x = dropZone.x;
  //     this.y = dropZone.y;

  //     this.input.enabled = false;

  // });

  // this.scene.input.on('dragend', function (pointer, dropped) {

  //     console.log('dragend', dropped);

  //     if (!dropped)
  //     {
  //         this.x = this.input.dragStartX;
  //         this.y = this.input.dragStartY;
  //     }

  // });
  //     this.scene.physics.add.overlap(/* since we tied the player to the scene? */ this.scene.protag,
  //       this.zone,
  //       () => {
  //           this.setSign(225);
  //       },
  //       null,
  //       this.scene)
  //   }