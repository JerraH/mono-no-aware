import {Scene} from 'phaser';

export default class TitleScene extends Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('title', 'assets/title.png')
        this.load.image('start', 'assets/start.png')
    }

    create() {
        let title = this.add.image(400, 300, 'title')
        this.start = this.add.image(400, 320, 'start')
        this.blink = 0;
        this.input.keyboard.once('keydown', (event) => {
            this.scene.start('pronoun');
        });        
    }

    update(thime, delta) {
        this.blink += delta;
        this.start.alpha = 1 - Math.floor(this.blink / 500) % 2;
    }
}