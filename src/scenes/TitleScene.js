import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {

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
        Phaser.Display.Align.In.Center(this.start, this.add.zone(400, 280, 200, 200));

        this.selection = [];
        for (let i = 0; i < 2; i++) {
            let selection = this.add.graphics(200, 54);
            this.selection.push(selection);
            selection.lineStyle(3.5, i * 0xffcf00, 1);
            selection.strokeRect(0, 0, 200, 54);
            selection.x = 300;
            selection.y = 253;
        }

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
        this.selection[1].alpha = Math.min(1, Math.abs(this.blink % 1000 - 500) / 500);
    }
}
