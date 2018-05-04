import {Scene} from 'phaser';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
    }

    create() {
        // var logo = this.add.image(400, 150, 'logo');

        this.protag = this.physics.add.sprite(400, 300, 'protag')

        this.NPCs = this.add.group();

        let toys = this.physics.add.staticGroup();
        let furryToy = toys.create(600, 400, 'toy')

        this.protag.setCollideWorldBounds(true);
        this.physics.add.collider(this.protag, toys);

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
        this.load.image('protag', 'assets/blackprotag.png');
        this.load.image('toy', 'assets/protagToy.png');
        this.load.image('protag', 'assets/images/protag.png')
    }

    update() {
        if (this.cursors.left.isDown) {
            this.protag.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown) {
            this.protag.setVelocityX(160);
        }
        else if(this.cursors.up.isDown) {
            this.protag.setVelocityY(-160);
        }
        else if(this.cursors.down.isDown) {
            this.protag.setVelocityY(160);
        }
        else {
            this.protag.setVelocityX(0);
            this.protag.setVelocityY(0);
        }
    }
}
