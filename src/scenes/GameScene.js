import  Phaser, {Scene} from 'phaser';
import store from '../store';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
        this.timers = [];
        this.updatableTimers = [];
        this.frameMS = 0;

    }

    preload() {
        this.load.audio('theme', 'assets/audio/theme.m4a')
    }

    create() {
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();

        if (!store.getMusic()) {
            let theme = this.sound.add('theme');
           theme.play({ loop: true, volume: 0.5 });
           store.setMusic(theme);
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });//master changed {enter: KeyCode} to {inventory: KeyCode}
        //inventory now relies on space instead of enter
        //and I couldn't get inventory and interaction
        //to work with the change that master did aswell
        this.stateChangeEnterKeyReleased = false;
        this.stateChangeSpaceKeyReleased = false;

    }

    setCameras() {
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)
    }

    // updateFrame() {
    //     // do something only every 1/10 second
    // }

    setTimeout(cb, ms) {
        this.timers.push({
            cb,
            ms: this.frameMS + ms
        });
    }

    setInterval(cb, ms) {
        let timer = {
            cb,
            ms: this.frameMS + ms,
            interval: ms
        }
        this.timers.push(timer)
        return timer;
    }

    setUpdatingTimeout(cb, ms, purpose) {
        const updatableTimer = {
            cb,
            ms: this.frameMS + ms,
            purpose: purpose
        }
        this.updatableTimers = this.updatableTimers.filter(timer => {
            if(purpose === timer.purpose) {
                return false;
            }
            return true;
        });
        this.updatableTimers.push(updatableTimer);
    }

    clearInterval(timer) {
        delete timer.interval;
    }

    update(time, delta) {
        this.frameMS += delta;

        this.timers = this.timers.filter(timer => {
            if (this.frameMS >= timer.ms) {
                timer.cb();
                if (timer.interval) {
                    timer.ms += timer.interval;
                } else {
                    return false; // bye bye!
                }
            }
            return true;
        });

        this.updatableTimers = this.updatableTimers.filter(timer => {
            if (this.frameMS >= timer.ms) {
                timer.cb();
                if(this.frameMS + 3000 >= timer.ms) {
                    return false;
                }
            }
            return true;
        })

        // if (this.frameMS >= 100) {
        //     this.frameMS -= 100;
        //     this.frame++;
        //     this.updateFrame();
        // }

        let velX = 0;
        let velY = 0;

        //if you're not in conversation mode, the keys control the protagonist
        if (!store.getDialogue() && !store.getInventoryActive() && !store.getInteractionActive()) {
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
            if (this.cursors.space.isDown) {//inventory was changed to space, and interact to enter
                if (this.stateChangeSpaceKeyReleased) {
                    // this is a legitimate key press to open the inventory
                    store.setInventoryActive(true);
                    this.scene.launch('inventory');
                    // let interval = this.setInterval(() => {
                    //     this.sound.add('tap').play({ volume: 0.5 });
                    // }, 500);
                    // this.setTimeout(() => {
                    //     this.clearInterval(interval);
                    // }, 3000);
                }
            } else {
                // this makes sure you release enter from another window before pressing it here
                this.stateChangeSpaceKeyReleased = true;
            }

            if (this.keys.enter.isDown) {
                const currentItem = this.items.filter(item => {
                    return item.sign.visible;
                });
                if (this.stateChangeEnterKeyReleased && currentItem[0]) {
                    // this is a legitimate key press to open interaction
                    store.setInteractionActive(true);
                    store.setCurrentItem(currentItem[0]);
                    this.scene.launch('interaction');
                }
            } else {
                // this makes sure you release enter from another window before pressing it here
                this.stateChangeEnterKeyReleased = true;
            }

        } else {
            // key must be lifted in between state changes
            this.stateChangeEnterKeyReleased = false;
            this.stateChangeSpaceKeyReleased = false;
        }

        if (this.protag && this.protag.body) {
            this.protag.setVelocityX(velX);
            this.protag.setVelocityY(velY);

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
}

