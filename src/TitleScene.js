import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.audio('intro', 'assets/audio/intro.m4a')
        this.load.audio('select', 'assets/audio/select.m4a')
    }

    create() {
        let theme = this.sound.add('intro');
        theme.play();

        let title = this.add.text(0, 0, "Mono No Aware", { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.Center(title, this.add.zone(400, 250, 0, 0));

        this.start = this.add.text(0, 0, "START", { font: "30px Montserrat" });
        Phaser.Display.Align.In.Center(this.start, this.add.zone(400, 310, 0, 0));

        this.blink = 0;
        this.input.keyboard.once('keydown', (event) => {
            theme.stop();
            this.sound.add('select').play();
            this.scene.start('pronoun');
        });
    }

    update(thime, delta) {
        this.blink += delta;
        this.start.alpha = 1 - Math.floor(this.blink / 500) % 2;
    }
}