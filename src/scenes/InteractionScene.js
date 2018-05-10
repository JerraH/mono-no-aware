import {Scene} from 'phaser';
import store from '../store';
import Dialogue from '../Dialogue';

const WIDTH = 800;
const HEIGHT = 600;
const ITEM_SIZE = 100;
const BORDER_SIZE = 15;
const SELECTION_SIZE = 100;

export default class InventoryScene extends Scene {
    constructor(config) {
        super(config);
        this.handleKey = this.handleKey.bind(this);
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
            onComplete() {//this has a different this context
                if (visible) {
                    me.sound.add('select').play();
                    me.selectOptions.forEach(option => {
                        option.alpha = 1;
                    })
                } else {
                    me.scene.stop();//this is where the exit is!
                    store.setInteractionActive(false);
                    // me.handleResponse();
                }
            }
        });
    }

    handleSelectedOption(option) {
        switch (option) {
            case 'Take':
                store.addToInventory(this.currentItem)
                this.currentItem.visible = false;
                this.selectOptions.forEach(option => {
                    option.alpha = 0;
                });
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                this.updateVisibleTween(false);//scene.stop() exit happens in this function
                break;
            case 'Look':
                // look at item
                store.setDialogue(new Dialogue(this.currentItem.name, this.currentItem.description));
                this.scene.launch('dialogue');
                break;
            case 'Leave':
                this.selectOptions.forEach(option => {
                    option.alpha = 0;
                });
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                this.updateVisibleTween(false);//scene.stop() exit happens in this function
                break;
        }
    }

    handleKey(event) {
        if (event.repeat || store.getDialogue()) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                if (this.selectionIndex > 0) {//stops it from looping leftward
                    this.sound.add('tap').play();
                    this.selectionIndex--;
                    this.updateSelectionTween();
                }
                break;
            case 'ArrowRight':
                if (this.selectionIndex < this.selectOptions.length - 2) { //stops it from looping
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                    this.updateSelectionTween();
                }
                break;
            case 'Enter':
            this.handleSelectedOption(this.selectOptions[this.selectionIndex].text);
                break;
            case 'Escape':
            this.selectOptions.forEach(option => {
                option.alpha = 0;
            })
            this.sound.add('select').play();
            this.input.keyboard.off('keydown', this.handleKey)
            this.updateVisibleTween(false);//scene.stop() exit happens in this function
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

        this.currentItem = store.getCurrentItem();

        this.everything = [];

        this.bkg = this.add.graphics(WIDTH, ITEM_SIZE + BORDER_SIZE * 2);//background load requires
        this.bkg.lineStyle(2, 0xffffff, 1);//background tween to be responsive I believe
        this.bkg.fillStyle(0, 1);
        this.bkg.strokeRect(0, 0, WIDTH, ITEM_SIZE + BORDER_SIZE * 2);
        this.bkg.fillRect(0, 0, WIDTH, ITEM_SIZE + BORDER_SIZE * 2);
        this.bkg.x = 0;
        this.bkg.y = HEIGHT;

        this.selectOptions = []; //this.add.text() draws the actual letters
        this.selectOptions[0] = this.add.text(0, 0, 'Take'.replace(' ', '\n'), { font: "16px Berkshire Swash" });
        this.selectOptions[1] = this.add.text(0, 0, 'Look'.replace(' ', '\n'), { font: "16px Berkshire Swash" });
        this.selectOptions[2] = this.add.text(0, 0, 'Leave'.replace(' ', '\n'), { font: "16px Berkshire Swash" });
        
        for (let i = 0; i < this.selectOptions.length; i++) {
            let selectOption = this.selectOptions[i];

            Phaser.Display.Align.In.Center(selectOption, this.add.zone(//Aligns the letters
                BORDER_SIZE + (ITEM_SIZE + BORDER_SIZE) * i + ITEM_SIZE / 2,
                HEIGHT - BORDER_SIZE - ITEM_SIZE / 2, 0, 0));
        }

        this.selection = this.add.graphics();//selection is for the yellow selector tween I believe
        this.selection.lineStyle(2, 0xffffff, 1);
        this.selection.strokeRect(0, 0, SELECTION_SIZE, SELECTION_SIZE);
        this.selection.x = this.getSelectionX();
        this.selection.y = HEIGHT - ITEM_SIZE - BORDER_SIZE - (SELECTION_SIZE - ITEM_SIZE) / 2;
        this.selectOptions.push(this.selection);

        this.selectOptions.forEach(option => {
            option.alpha = 0;
        })

        this.input.keyboard.on('keydown', this.handleKey);

        this.updateVisibleTween(true);
    }

    update(time, delta) {
    }
}
