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
        this.load.image('menubg', 'assets/menubg.png');
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
                    this.sound.add('tap').play({ volume: 0.5 });
                    this.selectionIndex--;
                    this.updateSelectionTween();
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < 2) {
                    this.sound.add('tap').play({ volume: 0.5 });
                    this.selectionIndex++;
                    this.updateSelectionTween();
                }
                break;
            case 'Enter':
                this.sound.add('select').play({ volume: 0.5 });
                this.input.keyboard.off('keydown', this.handleKey)
                store.setPronoun(Constants.PRONOUNS[this.selectionIndex]);
                this.scene.start('beloved');
                break;
            default:
                break;
        }
    }

    create() {
        let bkg = this.add.image(0, 0, 'menubg');
        Phaser.Display.Align.In.Center(bkg, this.add.zone(400, 250, 0, 0));

        let title = this.add.text(0, 0, "Choose Your Pronouns", { font: "40px Berkshire Swash", color: "#000000" });
        Phaser.Display.Align.In.Center(title, this.add.zone(400, 170, 0, 0));

        for (let i = 0; i < PRONOUNS.length; i++) {
            let pronoun = this.add.text(0, 0, PRONOUNS[i] + '  ', { font: "36px Kaushan Script", color: "#000000" });
            Phaser.Display.Align.In.Center(pronoun, this.add.zone(400, 240+i*60, 0, 0));
        }

        this.selection = [];
        for (let i = 0; i < 2; i++) {
            let selection = this.add.graphics(200, 54);
            this.selection.push(selection);
            selection.lineStyle(3.5, i * 0xffcf00, 1);
            selection.strokeRect(0, 0, 200, 54);
            selection.x = 300;
            selection.y = this.getSelectionY();
        }

        this.blink = 0;

        this.input.keyboard.on('keydown', this.handleKey);
    }

    updateSelectionTween() {
        if (this.selectionTween) {
            this.selectionTween.stop();
        }
        this.selectionTween = this.tweens.add({
            targets: this.selection,
            ease: 'Sine.easeInOut',
            duration: 300,
            y: this.getSelectionY()
        });
    }

    getSelectionY() {
        return 213 + this.selectionIndex * 60;
    }

    update(time, delta) {
        this.selection.y = 213 + this.selectionIndex * 60;
        this.blink += delta;
        this.selection[1].alpha = Math.min(1, Math.abs(this.blink % 1000 - 500) / 500);
   }
}
