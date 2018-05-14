import Phaser, {GameObject, Image, Collider} from 'phaser';

export default class Protag extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        this.scene = config.scene
        this.x = config.x
        this.y = config.y
        this.key = config.key
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this)
        this.body.immovable = true;
        // console.log(this.body)
    }
    create(){
        this.body.height = 20
        this.body.width = 120
        this.body.offset = {x: 10, y: 160};
    }
}
