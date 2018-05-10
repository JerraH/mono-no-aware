import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
    constructor(config) {
        super(config)


    }

    preload() {
        this.load.image('startscreen', 'assets/startscreen.png')
        this.load.image('starttext', 'assets/starttext.png')
        this.load.audio('intro', 'assets/audio/intro.m4a')
        this.load.audio('select', 'assets/audio/select.m4a')
    }

    create() {
        let theme = this.sound.add('intro');
        theme.play({ volume: 0.5 });

        let bkg = this.add.image(0, 0, 'startscreen');
        Phaser.Display.Align.In.Center(bkg, this.add.zone(400, 250, 0, 0));

        this.start = this.add.image(0, 0, 'starttext');
        Phaser.Display.Align.In.Center(this.start, this.add.zone(400, 290, 200, 200));

        this.blink = 0;
        this.input.keyboard.once('keydown', (event) => {
            theme.stop();
            this.sound.add('select').play({ volume: 0.5 });
            this.scene.start('pronoun');
            // this.scene.start('EmpressBedroom');
        });
    }

    update(time, delta) {
        this.blink += delta;
        this.start.alpha = [1,1,1,0][Math.floor(this.blink / 200) % 4];
    }
}
