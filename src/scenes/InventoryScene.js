import {Scene} from 'phaser';
import store from '../store';

const WIDTH = 800;
const HEIGHT = 600;
const ITEM_SIZE = 50;
const BORDER_SIZE = 10;
const SELECTION_SIZE = 60;

export default class InventoryScene extends Scene {
    constructor(config) {
        super(config);
        this.handleKey = this.handleKey.bind(this);
        this.everything = []
    }

    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    updateSelectionTween() {
        if (this.selectionTween) {
            this.selectionTween.stop();
        }
        this.selectionTween = this.tweens.add({
            targets: this.selection,
            ease: 'Sine.easeInOut',
            duration: 300,
            x: this.getSelectionX()
        });
    }

    updateVisibleTween(visible) {
        let me = this;
        if (this.visibleTween) {
            this.visibleTween.stop();
        }
        this.visibleTween = this.tweens.add({
            targets: this.bkg,
            ease: 'Sine.easeInOut',
            duration: 300,
            y: visible ? HEIGHT - ITEM_SIZE - BORDER_SIZE * 2 : HEIGHT,
            onComplete() {
                if (visible) {
                    me.sound.add('select').play();
                    me.everything.forEach(item => {
                        item.alpha = 1;
                    });
                } else {
                    me.scene.stop();
                    store.setInventoryActive(false);
                    // me.handleResponse();
                }
            }
        });
    }

    handleKey(event) {
        if (event.repeat) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                if (this.selectionIndex > 0) {
                    this.sound.add('tap').play();
                    this.selectionIndex--;
                    this.updateSelectionTween();
                }
                break;
            case 'ArrowRight':
                if (this.selectionIndex < store.getInventory().length-1) {
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                    this.updateSelectionTween();
                }
                break;
            case 'Enter':
                this.everything.forEach(item => {
                    item.alpha = 0
                });
                this.updateVisibleTween(false);
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                break;
            default:
                break;
        }
    }

    getSelectionX() {
        return BORDER_SIZE + this.selectionIndex * (ITEM_SIZE + BORDER_SIZE) -
            (SELECTION_SIZE - ITEM_SIZE) / 2;
    }

    create() {
        this.selectionIndex = 0;

        let inventory = store.getInventory();

        this.bkg = this.add.graphics(WIDTH, ITEM_SIZE + BORDER_SIZE * 2);
        this.bkg.lineStyle(2, 0xffffff, 1);
        this.bkg.fillStyle(0, 1);
        this.bkg.strokeRect(0, 0, WIDTH, ITEM_SIZE + BORDER_SIZE * 2);
        this.bkg.fillRect(0, 0, WIDTH, ITEM_SIZE + BORDER_SIZE * 2);
        this.bkg.x = 0;
        this.bkg.y = HEIGHT;

        for (let i = 0; i < inventory.length; i++) {
            console.log(inventory)
            let item = this.add.text(0, 0, inventory[i].name, { font: "12px Berkshire Swash" });
            this.everything.push(item);
            Phaser.Display.Align.In.Center(item, this.add.zone(
                BORDER_SIZE + (ITEM_SIZE + BORDER_SIZE) * i + ITEM_SIZE / 2,
                HEIGHT - BORDER_SIZE - ITEM_SIZE / 2, 0, 0).setDropZone());
        }

        this.selection = this.add.graphics();
        this.selection.lineStyle(2, 0xffffff, 1);
        this.selection.strokeRect(0, 0, SELECTION_SIZE, SELECTION_SIZE);
        this.selection.x = this.getSelectionX();
        this.selection.y = HEIGHT - ITEM_SIZE - BORDER_SIZE - (SELECTION_SIZE - ITEM_SIZE) / 2;
        this.everything.push(this.selection);

        this.everything.forEach(item => {
            item.alpha = 0;
        })

        this.input.keyboard.on('keydown', this.handleKey);

        this.updateVisibleTween(true);
    }

    update(time, delta) {
    }
}
