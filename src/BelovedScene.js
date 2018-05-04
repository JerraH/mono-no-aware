import {Scene} from 'phaser';
import store from './store';
import Constants from './constants';

let PRONOUN_MAP = {
    [Constants.PRONOUN_HE]: 'Emperor',
    [Constants.PRONOUN_SHE]: 'Empress',
    [Constants.PRONOUN_THEY]: 'Eminence'
}

let BELOVEDS = Constants.PRONOUNS.map(pronoun => PRONOUN_MAP[pronoun]);

export default class BelovedScene extends Scene {
    constructor(config) {
        super(config);
        this.selectionIndex = 1;
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.image('selection', 'assets/listSelection.png')
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
                store.setBeloved(Constants.PRONOUNS[this.selectionIndex]);
                this.scene.start('EmpressBedroom');
                break;
            default:
                break;
        }
    }

    create() {
        let title = this.add.text(0, 0, "Choose Your Beloved", { font: "40px Montserrat" });
        Phaser.Display.Align.In.Center(title, this.add.zone(400, 210, 0, 0));

        for (let i = 0; i < BELOVEDS.length; i++) {
            let beloved = this.add.text(0, 0, BELOVEDS[i], { font: "28px Montserrat" });
            Phaser.Display.Align.In.Center(beloved, this.add.zone(400, 270+i*50, 0, 0));
        }

        this.selection = this.add.image(400, 0, 'selection')
        this.input.keyboard.on('keydown', this.handleKey);
    }

    update() {
        this.selection.y = 270 + this.selectionIndex * 50;
    }
}
