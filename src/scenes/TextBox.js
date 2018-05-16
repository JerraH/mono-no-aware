import Phaser from 'phaser';
import store from '../store';
import Dialogue from '../Dialogue';

export default class TextBox extends Phaser.Scene {
    constructor(config) {
        super(config)
        this.handleKey = this.handleKey.bind(this);

        this.constants = {
            WIDTH: 800,
            HEIGHT: 600,
            BORDER_SIZE: 25,
            SPACE_PX: 15,
            LINE_HEIGHT: 40,
            SELECTION_HEIGHT: 54
        }
    }

    handleClose() {
        this.scene.stop();        
    }

    handleResponse() {
        this.selectionTweens = this.selectionTweens.filter(tween => {
            tween.stop();
            return false;
        });

        let response = this.responses.length && this.responses[this.selectionIndex];

        if (response && response.childFn) {
            response.child = response.childFn();
        }

        // set dialogue to child, if one exists, otherwise reset it
        store.setDialogue(response && response.child);

        if (response && response.cb) {
            // run callback, if any
            response.cb();
        }

        if (response && response.child) {
            // re-render convo with child text
            this.sound.add('chatresponse').play({
                volume: 0.5
            });
            this.render();
        } else {
            // no child, so exit dialogue
            this.sound.add('close').play({
                volume: 0.5
            });
            this.input.keyboard.off('keydown', this.handleKey)
            this.handleClose();
        }
    }

    handleKey(event) {
        if (event.repeat) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.updateSelectionTween(this.selectionIndex, this.selectionIndex - 1);
                    this.selectionIndex--;
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < this.responsesText.length-1) {
                    this.updateSelectionTween(this.selectionIndex, this.selectionIndex + 1);
                    this.selectionIndex++;
                }
                break;
            case 'Escape':
                if (this.responses.length === 0) {
                    this.handleResponse();
                }
                break;
            case 'Enter':
                this.handleResponse();
                break;
            default:
                break;
        }
    }

    updateSelectionTween(lastIndex, nextIndex) {
        // trigger sound
        this.sound.add('tap').play({volume: 0.5});
        
        // fade out last item
        this.selectionTweens.push(this.tweens.add({
            targets: this.responsesText[lastIndex].selected,
            ease: 'Sine.easeInOut',
            duration: 300,
            alpha: 0
        }));

        // fade in last item
        this.selectionTweens.push(this.tweens.add({
            targets: this.responsesText[nextIndex].selected,
            ease: 'Sine.easeInOut',
            duration: 300,
            alpha: 1
        }));
    }

    preload() {
        this.load.audio('chat', 'assets/audio/chat.m4a')
        this.load.audio('close', 'assets/audio/close.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
        this.load.audio('chatresponse', 'assets/audio/chatresponse.m4a')
    }

    create() {
        this.style = {
            font: '18px Cabin',
            color: 'black',
            align: 'left',
            wordWrap: {
                width: this.constants.TEXT_WIDTH,
                useAdvancedWrap: true
            }
        }
        
        this.unselectedStyle = Object.assign({}, this.style, {
            strokeThickness: 6,
            stroke: '#ffefdf'
        })
        
        this.selectedStyle = Object.assign({}, this.unselectedStyle, {
            color: '#ffff00',
            stroke: '#000000'
        })        

        this.dialogueContainer = this.add.container(this.constants.LEFT + this.constants.TEXT_WIDTH / 2, 0);
        this.bkg = this.add.graphics();
        this.selection = this.add.graphics();
        this.responsesText = [];
        this.selectionTweens = [];
        if (this.overlayBackground) {
            this.overlayBackground();
        }
        this.render();
        this.sound.add('chat').play({ volume: 0.1 });
        this.input.keyboard.on('keydown', this.handleKey);
    }

    update(time, delta) {
        if (this.handleUpdate) {
            this.handleUpdate(delta);
        }
    }
}
