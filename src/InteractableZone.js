import Phaser from 'phaser'

export default class InteractableZone extends Phaser.GameObjects.Zone {
    constructor(config) {
      super(config.scene, config.x, config.y, config.width, config.height);
      config.scene.add.existing(this);
      config.scene.physics.world.enable(this);
      this.type = "iZone";
    }

    update(keys, time, delta) {
      
    }
  }