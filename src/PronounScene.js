import {Scene} from 'phaser';
import store from './store';

let PRONOUNS = ['she', 'they', 'he'];

export default class PronounScene extends Scene {
    constructor(config) {
        super(config);
        this.selectionIndex = 1;
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.image('pronoun', 'assets/pronouns.png')
        this.load.image('selection', 'assets/listSelection.png')
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    handleKey(event) {
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
                store.setPronoun(PRONOUNS[this.selectionIndex]);
                this.scene.start('beloved');
                break;
            default:
                break;
        }
    }

    create() {
        let title = this.add.image(400, 300, 'pronoun')
        this.selection = this.add.image(403, 0, 'selection')
        this.input.keyboard.on('keydown', this.handleKey);
    }

    update() {  
        this.selection.y = 272 + this.selectionIndex * 47;
    }
}