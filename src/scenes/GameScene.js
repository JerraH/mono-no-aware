import {Scene} from 'phaser';
import store from '../store';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
        this.frame = 0;
        this.frameMS = 0;
    }

    addKeys() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({enter: Phaser.Input.Keyboard.KeyCodes.ENTER});        
        this.stateChangeKeyReleased = false;
    }

    create() {
        // var logo = this.add.image(400, 150, 'logo');


        this.NPCs = this.add.group();

        let toys = this.physics.add.staticGroup();
        let furryToy = toys.create(600, 400, 'toy')

        // this.cat.setCollideWorldBounds(true);
        // this.physics.add.collider(this.cat, toys);

        this.addKeys();

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

    updateFrame() {
        // do something only every 1/10 second
    }

    update(time, delta) {
        this.frameMS += delta;
        if (this.frameMS >= 100) {
            this.frameMS -= 100;
            this.frame++;
            this.updateFrame();
        }
        
        let velX = 0;
        let velY = 0;

        if (!store.getDialogue() && !store.getInventoryActive()) {
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
            if (this.keys.enter.isDown) {
                if (this.stateChangeKeyReleased) {
                    store.setInventoryActive(true);
                    this.scene.launch('inventory');
                }
            } else {
                this.stateChangeKeyReleased = true;
            }
        } else {
            // key must be lifted in between state changes
            this.stateChangeKeyReleased = false;
        }

        this.protag.setVelocityX(velX);
        this.protag.setVelocityY(velY);
    }
}
