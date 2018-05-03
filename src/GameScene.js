import {Scene} from 'phaser';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
    }

    create() {
        // var logo = this.add.image(400, 150, 'logo');
        this.cat = this.physics.add.sprite(400, 300, 'cat')

        this.NPCs = this.add.group();

        let toys = this.physics.add.staticGroup();
        let furryToy = toys.create(600, 400, 'toy')

        this.cat.setCollideWorldBounds(true);
        this.physics.add.collider(this.cat, toys);

        this.cursors = this.input.keyboard.createCursorKeys();

        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: 'Power2',
        //     yoyo: true,
        //     loop: -1
        // });
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('cat', 'assets/blackCat.png');
        this.load.image('toy', 'assets/catToy.png');
    }

    update() {
        if (this.cursors.left.isDown) {
            this.cat.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown) {
            this.cat.setVelocityX(160);
        }
        else if(this.cursors.up.isDown) {
            this.cat.setVelocityY(-160);
        }
        else if(this.cursors.down.isDown) {
            this.cat.setVelocityY(160);
        }
        else {
            this.cat.setVelocityX(0);
            this.cat.setVelocityY(0);
        }
    }
}
