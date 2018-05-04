import Phaser from "phaser";

export default class Protag extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'protag';
        config.scene.add.existing(this);
        this.protag = this.scene.protag;
        this.body.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true)
        config.scene.add.existing(this);

    }
}
