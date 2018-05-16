import Phaser from 'phaser';
import store from '../store';
import TextBox from './TextBox';

export default class DialogueScene extends TextBox {
    constructor(config) {
        super(config);
        this.constants = Object.assign({}, this.constants, {
            TEXT_WIDTH: 600
        })
    }

    render() {
        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        if (this.text) {
            this.text.destroy()
        }
        this.text = this.add.text(0, 0, dialogue.text, this.style)
        Phaser.Display.Align.In.Center(this.text, this.dialogueContainer)
        this.text.y = 100;

        let boxWidth = this.constants.TEXT_WIDTH + this.constants.BORDER_SIZE * 2;
        let contentHeight = this.text.height;
        let contentY = (this.constants.HEIGHT - contentHeight) / 2;
        this.bkg.clear();
        this.bkg.lineStyle(2, 0xffffff, 1);
        this.bkg.fillStyle(0, 0.75);
        this.bkg.strokeRect(0, 0, boxWidth, contentHeight);
        this.bkg.fillRect(0, 0, boxWidth, contentHeight);
        this.bkg.x = (this.constants.WIDTH - boxWidth) / 2;
        this.bkg.y = contentY;

        this.responsesText.forEach(response => response.destroy());
        this.responsesText.length = 0;
        for (let i = 0; i < this.responses.length; i++) {
            if (this.responses[i].text) {
                // only show responses with text
                let response = this.add.text(0, 0, this.responses[i].text, { font: "20px Amatic SC", wordWrap: {
                    width: boxWidth,
                    useAdvancedWrap: true
                } });
                this.responsesText.push(response);
                Phaser.Display.Align.In.Center(response, this.add.zone(this.constants.WIDTH / 2,
                    contentY + contentHeight - this.constants.BORDER_SIZE - (this.responses.length - i - 0.5) * this.constants.SELECTION_HEIGHT,
                    0, 0));
            }
        }
    }
}
