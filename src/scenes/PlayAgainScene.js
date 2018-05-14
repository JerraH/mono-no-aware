import Phaser from 'phaser';
import store from '../store';

export default class PlayAgainScene extends Phaser.Scene {


    preload() {
        this.load.image('menubg', 'assets/menubg.png');
        this.load.audio('select', 'assets/audio/select.m4a')
    }

    create() {
        let music = store.getMusic();
        if (music) {
            music.stop();
            store.setMusic();
        }

        let theme = this.sound.add('intro');
        theme.play({ volume: 0.5 });

        let bkg = this.add.image(0, 0, 'menubg');
        Phaser.Display.Align.In.Center(bkg, this.add.zone(400, 250, 0, 0));

        let title = this.add.text(0, 0, "You Won the Game!", { font: "40px Berkshire Swash", color: "#000000" });
        Phaser.Display.Align.In.Center(title, this.add.zone(400, 225, 0, 0));

        this.start = this.add.text(0, 0, "~ Play Again ~ ", { font: "36px Kaushan Script", color: "#000000" });
        Phaser.Display.Align.In.Center(this.start, this.add.zone(400, 295, 200, 200));


        this.blink = 0;
        this.input.keyboard.once('keydown', (event) => {
            theme.stop();
            this.sound.add('select').play({ volume: 0.5 });

            store.reset();
            this.scene.start('pronoun');
        });
    }

    update(time, delta) {
        this.blink += delta;
        this.start.alpha = [1,0.75,0.5,0.75][Math.floor(this.blink / 250) % 4];
    }
}
