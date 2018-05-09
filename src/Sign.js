import Phaser from 'phaser'

export default class Sign extends Phaser.GameObjects.Image {
    constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "Sign";
      this.visible = false;
    }
  }