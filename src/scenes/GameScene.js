import {Scene} from 'phaser';
import store from '../store';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
    }

    create() {
        // var logo = this.add.image(400, 150, 'logo');


        this.NPCs = this.add.group();

        let toys = this.physics.add.staticGroup();
        let furryToy = toys.create(600, 400, 'toy')

        // this.cat.setCollideWorldBounds(true);
        // this.physics.add.collider(this.cat, toys);

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
        let velX = 0;
        let velY = 0;

        if (!store.getDialogue()) {
            if (this.cursors.left.isDown) {
                velX = -120;
            }
            else if (this.cursors.right.isDown) {
                velX = 120;
            }
            else if (this.cursors.up.isDown) {
                velY = -120;
            }
            else if (this.cursors.down.isDown) {
                velY = 120;
            }
        }
        this.protag.setVelocityX(velX);
        this.protag.setVelocityY(velY);
    }
}
