import {Scene} from 'phaser';
import store from './store';

let BELOVEDS = ['she', 'they', 'he'];

export default class BelovedScene extends Scene {
    constructor(config) {
        super(config);
        this.selectionIndex = 1;
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.image('beloved', 'assets/beloved.png')
        this.load.image('selection', 'assets/listSelection.png')
    }

    handleKey(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.selectionIndex--;
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < 2) {
                    this.selectionIndex++;
                }
                break;
            case 'Enter':
                this.input.keyboard.off('keydown', this.handleKey)
                store.setBeloved(BELOVEDS[this.selectionIndex]);
                this.scene.start('EmpressBedroom');
                break;
            default:
                break;
        }
    }

    create() {
        let title = this.add.image(400, 300, 'beloved')
        this.selection = this.add.image(403, 0, 'selection')
        this.input.keyboard.on('keydown', this.handleKey);
    }

    update() {
        this.selection.y = 279 + this.selectionIndex * 43;
    }
}
