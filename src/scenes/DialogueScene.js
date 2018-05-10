import {Scene} from 'phaser';
import store from '../store';

const WIDTH = 800;
const HEIGHT = 600;
const TEXT_WIDTH = 600;
const BORDER_SIZE = 25;
const BOX_WIDTH = TEXT_WIDTH + BORDER_SIZE * 2;
const MAX_HEIGHT = 500;
const SPACE_PX = 15;
const TITLE_HEIGHT = 50;
const LINE_HEIGHT = 40;
const SELECTION_HEIGHT = 54;

export default class DialogueScene extends Scene {
    constructor(config) {
        super(config);
        this.handleKey = this.handleKey.bind(this);
    }

    preload() {
        this.load.audio('chat', 'assets/audio/chat.m4a')
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('close', 'assets/audio/close.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    handleResponse() {
        if (this.selectionTween) {
            this.selectionTween.stop();
            this.selectionTween = null;
        }

        let response = this.responses.length && this.responses[this.selectionIndex];

        // set dialogue to child, if one exists, otherwise reset it
        store.setDialogue(response && response.child);

        if (response && response.cb) {
            // run callback, if any
            response.cb();
        }

        if (response && response.child) {
            // re-render convo with child text
            this.sound.add('select').play({ volume: 0.5 });
            this.render();
        } else {
            // no child, so exit dialogue
            this.sound.add('close').play({ volume: 0.5 });
            this.input.keyboard.off('keydown', this.handleKey)
            this.scene.stop();
        }
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
                if (this.selectionIndex < store.getDialogue().responses.length-1) {
                    this.sound.add('tap').play({ volume: 0.5 });
                    this.selectionIndex++;
                    this.updateSelectionTween();
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

    justifyText(text, width) {
        this.words.forEach(word => word.destroy());
        this.words = [];

        let y = -LINE_HEIGHT / 2;

        let paragraphs = text.split('\n').filter(line => line.length);
        paragraphs.forEach(paragraph => {
            y += LINE_HEIGHT;

            let splitText = paragraph.split(/\s/).filter(word => word.length);
            let words = splitText.map(word => this.add.text(0, 0, word, { font: "40px Amatic SC", scaleY: 0.5 }));
            this.words = this.words.concat(words);
            let curWord = 0;
            while (curWord < words.length) {
                // more words, so make a line of text
                let lineWidth = words[curWord].width;
                let startingWord = curWord;
                words[curWord++].y = y;
                while (curWord < words.length &&
                    lineWidth + SPACE_PX + words[curWord].width < width) {
                    words[curWord].x = words[curWord - 1].x + words[curWord - 1].width + SPACE_PX;
                    words[curWord].y = y;
                    lineWidth += SPACE_PX + words[curWord].width;
                    curWord++;
                }
                if (curWord !== words.length && curWord - startingWord > 1) {
                    let addWidth = (width - lineWidth) / (curWord - startingWord - 1);
                    for (let i = startingWord; i < curWord; i++) {
                        words[i].x += addWidth * (i - startingWord);
                    }
                }
                y += LINE_HEIGHT;
                this.wordWidth = Math.max(this.wordWidth, words[curWord-1].x + words[curWord-1].width);
            }
        })

        this.wordHeight = y + LINE_HEIGHT;
    }

    getSelectionY() {
        return this.contentY + 
            this.contentHeight - 
            BORDER_SIZE -
            (this.responses.length - this.selectionIndex) * SELECTION_HEIGHT;
    }

    render() {
        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        // justify text
        this.wordWidth = 0;
        this.wordHeight = 0;
        this.justifyText(dialogue.text.trim(), TEXT_WIDTH);
        this.contentHeight = this.wordHeight * 0.5 + 
            SELECTION_HEIGHT * this.responses.length +
            BORDER_SIZE * 2 +
            TITLE_HEIGHT;

        // scale text height
        let wordScaleY = 0.5;
        if (this.contentHeight > MAX_HEIGHT) {
            // compress text so it fits
            wordScaleY *= (this.wordHeight - (this.contentHeight - MAX_HEIGHT)) / this.wordHeight;
            this.contentHeight = MAX_HEIGHT;
        }
        this.contentY = (600 - this.contentHeight) / 2;

        this.bkg.clear();
        this.bkg.lineStyle(2, 0xffffff, 1);
        this.bkg.fillStyle(0, 0.75);
        this.bkg.strokeRect(0, 0, BOX_WIDTH, this.contentHeight);
        this.bkg.fillRect(0, 0, BOX_WIDTH, this.contentHeight);
        this.bkg.x = (WIDTH - BOX_WIDTH) / 2;
        this.bkg.y = this.contentY;

        // too tall, so compress lines
        this.words.forEach(word => {
            word.x += (WIDTH - this.wordWidth) / 2;
            word.y = this.contentY + BORDER_SIZE + TITLE_HEIGHT + word.y * wordScaleY;
            word.scaleY = wordScaleY;
        })
        
        if (this.title) {
            this.title.destroy();
        }
        this.title = this.add.text(0, 0, dialogue.name, { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.Center(this.title, this.add.zone(WIDTH / 2,
            this.contentY + BORDER_SIZE + TITLE_HEIGHT / 2, 0, 0));

        let maxWidth = 0;
        this.responsesText.forEach(response => response.destroy());
        this.responsesText.length = 0;
        for (let i = 0; i < this.responses.length; i++) {
            let response = this.add.text(0, 0, this.responses[i].text, { font: "40px Amatic SC" });
            this.responsesText.push(response);
            Phaser.Display.Align.In.Center(response, this.add.zone(WIDTH / 2, 
                this.contentY + this.contentHeight - BORDER_SIZE - (this.responses.length - i - 0.5) * SELECTION_HEIGHT,
                0, 0));
            maxWidth = Math.max(maxWidth, response.width);
        }
        maxWidth += 20;
    
        for (let i = 0; i < 2; i++) {
            let selection = this.selection[i];
            selection.clear();
            if (this.responses.length) {
                selection.lineStyle(3.5, (i == 0) ? 0x00ffff : 0xffcf00, 1);
                selection.strokeRect(0, 0, maxWidth, 54);
                selection.x = (WIDTH - maxWidth) / 2;
                selection.y = this.getSelectionY();
            }
        }
    }

    create() {
        this.protag = store.protag;

        this.bkg = this.add.graphics();
        this.selection = this.add.graphics();

        this.words = [];
        this.responsesText = [];
        this.title = null;
        this.selection = [];
        for (let i = 0; i < 2; i++) {
            this.selection.push(this.add.graphics(200, 54));
        }

        this.render();

        this.blink = 0;

        this.sound.add('chat').play({ volume: 0.1 });

        this.input.keyboard.on('keydown', this.handleKey);
    }

    update(time, delta) {
        this.blink += delta;
        this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
        this.selection[1].alpha = Math.min(1, Math.abs(this.blink % 1000 - 500) / 500);
   }
}
