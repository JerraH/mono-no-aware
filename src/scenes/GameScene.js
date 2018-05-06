import {Scene} from 'phaser';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);

    }

    create() {
        // var logo = this.add.image(400, 150, 'logo');

        // this.cat.setCollideWorldBounds(true);
        // this.physics.add.collider(this.cat, toys);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('cat', 'assets/blackCat.png');
        this.load.image('toy', 'assets/catToy.png');
    }

    update() {
        if (this.cursors.left.isDown) {
            this.protag.setVelocityX(-120);
        }
        else if (this.cursors.right.isDown) {
            this.protag.setVelocityX(120);
        }
        else if (this.cursors.up.isDown) {
            this.protag.setVelocityY(-120);
        }
        else if (this.cursors.down.isDown) {
            this.protag.setVelocityY(120);
        }
        else {
            this.protag.setVelocityX(0);
            this.protag.setVelocityY(0);
        }
        //Depth sorting!!! Allows you to go behind charadters and stuff
        if (this.protag.velocity !== 0) {
            this.protag.depth = this.protag.y + this.protag.height / 2;
            this.akiko.depth = this.akiko.y + this.akiko.height / 2;
        }

    }
}
