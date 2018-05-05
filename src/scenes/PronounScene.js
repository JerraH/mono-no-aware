import {Scene} from 'phaser';
import store from '../store';
import Constants from '../constants';

let PRONOUN_MAP = {
    [Constants.PRONOUN_HE]: 'He/Him',
    [Constants.PRONOUN_SHE]: 'She/Her',
    [Constants.PRONOUN_THEY]: 'They/Them'
}

let PRONOUNS = Constants.PRONOUNS.map(pronoun => PRONOUN_MAP[pronoun]);

export default class PronounScene extends Scene {
    constructor(config) {
        super(config);
        this.selectionIndex = 1;
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    handleKey(event) {
        if (event.repeat) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.sound.add('tap').play();
                    this.selectionIndex--;
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < 2) {
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                }
                break;
            case 'Enter':
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                store.setPronoun(Constants.PRONOUNS[this.selectionIndex]);
                this.scene.start('beloved');
                break;
            default:
                break;
        }
    }

    create() {
        let title = this.add.text(0, 0, "Choose Your Pronouns", { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.Center(title, this.add.zone(400, 210, 0, 0));

        for (let i = 0; i < PRONOUNS.length; i++) {
            let pronoun = this.add.text(0, 0, PRONOUNS[i], { font: "40px Amatic SC" });
            Phaser.Display.Align.In.Center(pronoun, this.add.zone(400, 270+i*60, 0, 0));
        }

        this.selection = this.add.graphics(200, 54);
        this.selection.lineStyle(2, 0xffffff, 1);
        this.selection.strokeRect(0, 0, 200, 54);
        this.selection.x = 300;
        this.blink = 0;

        this.input.keyboard.on('keydown', this.handleKey);
    }

    update(time, delta) {
        this.selection.y = 243 + this.selectionIndex * 60;
        this.blink += delta;
        this.selection.alpha = [1,0.5][Math.floor(this.blink / 500) % 2];
   }
}
