import Phaser from 'phaser';
import Dialogue from '../Dialogue';

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
        Phaser.Display.Align.In.Center(this.start, this.add.zone(400, 270, 200, 200));
        this.startX = this.start.x;
        this.startY = this.start.y;
        this.startCurve = { x: 0, y: 0, z: 0 };
        this.tweens.add({
            targets: this.startCurve,
            ease: 'Sine.easeInOut',
            duration: 1500,
            y: 1,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.startCurve,
            ease: 'Sine.easeInOut',
            duration: 1000,
            x: 1,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.startCurve,
            ease: 'Sine.easeInOut',
            duration: 400,
            z: 1,
            yoyo: true,
            repeat: -1
        });

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
        // this.start.alpha = [1,1,1,0][Math.floor(this.blink / 200) % 4];
        this.start.x = this.startX + (this.startCurve.x - 0.5) * 40;
        this.start.y = this.startY + this.startCurve.y * 10 + this.startCurve.z * 4;
    }
}
