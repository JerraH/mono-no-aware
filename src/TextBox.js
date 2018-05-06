import Phaser from 'phaser'

export default class TextBox {
    constructor(config) {
        this.body = new Phaser.Geom.Rectangle(config.x, config.y, config.width, config.height)
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this)
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.scene = config.scene
        this.key = config.key
        this.body.debug = true;
        let graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x0000aa } });
        graphics.fillRectShape(this);

        console.log(this.body);


    }
    create() {




    }

}

