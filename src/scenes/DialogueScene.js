import {Scene} from 'phaser';
import store from '../store';

export default class DialogueScene extends Scene {
    constructor(config) {
        super(config);
        this.selectionIndex = 0;
        this.responses = [];
        this.handleKey = this.handleKey.bind(this);
        this.protag = store.protag;
    }

    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }

    handleResponse() {
        if (this.responses.length > this.selectionIndex) {
            store.setDialogue(); // hide dialogue
            this.responses[this.selectionIndex].cb();
        }
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
                if (this.selectionIndex < store.getDialogue().responses.length-1) {
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                }
                break;
            case 'Enter':
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                this.scene.stop();
                this.handleResponse();
                break;
            default:
                break;
        }
    }

    justifyText(text, sx, sy, width, height) {
        let SPACE_PX = 15;
        let LINE_HEIGHT = 40;

        let splitText = text.split(' ');
        let words = splitText.map(word => this.add.text(sx, sy, word, { font: "40px Amatic SC" }));
        let y = sy;
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
        }

        // too tall, so compress lines
        if (y > sy + height) {
            words.forEach(word => {
                word.y = (word.y - sy) * height / (y - sy) + sy;
                word.scaleY = (sy + height) / y;
            })
        }
    }

    create() {
        let WIDTH = 400;

        let dialogue = store.getDialogue();
        this.responses = dialogue.responses;

        this.title = this.add.text(0, 0, dialogue.title, { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.Center(this.title, this.add.zone(400, 100, 0, 0));

        // justify text
        this.justifyText(dialogue.text, 200, 130, 400, 350);

        let maxWidth = 0;
        for (let i = 0; i < this.responses.length; i++) {
            let response = this.add.text(0, 0, this.responses[i].response, { font: "40px Amatic SC" });
            Phaser.Display.Align.In.Center(response, this.add.zone(400, 270+i*60, 0, 0));
            maxWidth = Math.max(maxWidth, response.width);
        }
        maxWidth += 20;

        this.selection = this.add.graphics(maxWidth, 54);
        this.selection.lineStyle(2, 0xffffff, 1);
        this.selection.strokeRect(0, 0, maxWidth, 54);
        this.selection.x = 400-maxWidth/2;

        this.blink = 0;

        this.input.keyboard.on('keydown', this.handleKey);
    }

    update(time, delta) {
        if (this.responses.length) {
            this.selection.y = 243 + this.selectionIndex * 60;
        }
        this.blink += delta;
        this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
   }
}
