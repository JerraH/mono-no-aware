import {Scene} from 'phaser';
import store from '../store';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
        this.frame = 0;
        this.frameMS = 0;

    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    addKeys() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({enter: Phaser.Input.Keyboard.KeyCodes.ENTER});
        this.stateChangeKeyReleased = false;
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.groundLayer) {
            this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)
        }


    }

    update(time, delta) {
        //if you're not in conversation mode, the keys control the protagonist
        if (this && !this.inConversation) {
            if (this.cursors.left.isDown) {
                this.protag.setVelocityX(-120);
            } else if (this.cursors.right.isDown) {
                this.protag.setVelocityX(120);
            } else if (this.cursors.up.isDown) {
                this.protag.setVelocityY(-120);
            } else if (this.cursors.down.isDown) {
                this.protag.setVelocityY(120);
            } else {
                this.protag.setVelocityX(0);
                this.protag.setVelocityY(0);
            }
            //if you are in conversation mode
        } else if (this.inConversation) {
            this.physics.pause()
            this.input.keyboard.on('keydown', this.handleKeyConvo)
        } else {
            return;
        }



            //Depth sorting!!! Allows you to go behind charadters and stuff
            if (this.protag.velocity !== 0) {
                this.protag.depth = this.protag.y + this.protag.height / 2;
                if (this.behinders && this.behinders.children) {
                    this.behinders.children.iterate((child) => {
                        child.depth = child.y + child.height / 2
                    })
        this.addKeys();

                }
                if (this.smoke && this.smoke.children) {
                    this.smoke.children.iterate((child) => {
                        child.depth = child.y + child.height / 2
                    })

                }
                if (this.akiko) {
                    this.akiko.depth = this.akiko.y + this.akiko.height / 2;
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
