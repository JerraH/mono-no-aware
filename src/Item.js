import Phaser from 'phaser'
import Zone from './InteractableZone'

export default class Item extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "item";
      this.body.immovable = false;
      this.zone = new Zone({scene: this.scene, x: this.x - 100, y: this.y - 100, width: 500, height: 500});
      //origin isn't the same as items origin. Item is centered, zone's origin is top left corner.

    }



    create() {
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
    }

    overlap() {
      console.log('Overlap!!!')
    }

    update(keys, time, delta) {

    }
  }
