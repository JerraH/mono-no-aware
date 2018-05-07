import {
    Scene
} from 'phaser';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
        this.handleKeyConvo = this.handleKeyConvo.bind(this)

    }
    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
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

                }
                if (this.smoke && this.smoke.children) {
                    this.smoke.children.iterate((child) => {
                        child.depth = child.y + child.height / 2
                    })

                }
                if (this.akiko) {
                    this.akiko.depth = this.akiko.y + this.akiko.height / 2;
                }

            }

        }
    }

    GameScene.prototype.handleKeyConvo = function (event) {
        //if they keep holding down the key, don't keep repeating the action!
        if (event.repeat) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    // this.sound.add('tap').play();
                    console.log(this)
                    this.selectionIndex--;
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < 1) {
                    // this.sound.add('tap').play();
                    console.log(this)
                    this.selectionIndex++;

                }
                break;
            case 'Enter':
                // this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                if (this.selectionIndex === 0) {
                    this.characterConvo.startScene();
                } else {
                    console.log(this)
                    this.characterConvo.endConversation();
                }
                break;
            default:
                break;
        }
        this.selection.y = 243 + this.selectionIndex * 60;
    }
