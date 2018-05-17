import Phaser from 'phaser';
import store from '../store';
import TextBox from './TextBox';

export default class DialogueScene extends TextBox {
    constructor(config) {
        super(config);
        this.constants = Object.assign({}, this.constants, {
            TEXT_WIDTH: 600,
            LEFT: 100,
            TOP: 50,
            MAX_HEIGHT: 500
        })
        this.blink = 0;
    }

    handleUpdate(delta) {
        this.blink += delta;
        this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
    }

    render() {
        this.style.color = "#ffffff";
        this.style.font = "24px Cabin";
        this.unselectedStyle.stroke = "#333333";
        this.unselectedStyle.color = "#ffffff";
        this.selectedStyle.stroke = "#333300";

        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        //add the dialogue title
        if (this.title) {
            this.title.destroy();
        }
        this.title = this.add.text(0, 0, dialogue.name, {
            font: '40px Berkshire Swash',
            color: '#ffffff'
        });
        Phaser.Display.Align.In.Center(this.title, this.dialogueContainer)

        if (this.text) {
            this.text.destroy()
        }
        this.text = this.add.text(0, 0, dialogue.text, this.style)
        console.log(this.style);
        Phaser.Display.Align.In.Center(this.text, this.dialogueContainer)

        this.responsesText.forEach(response => {
            response.selected.destroy();
            response.unselected.destroy();
        });
        this.responsesText.length = 0;
        let responseHeight = 0;
        for (let i = 0; i < this.responses.length; i++) {
            if (this.responses[i].text) {
                // only show responses with text
                let unselected = this.add.text(0, 0, this.responses[i].text, this.unselectedStyle);
                let selected = this.add.text(0, 0, this.responses[i].text, this.selectedStyle);
                selected.alpha = (i === 0) ? 1 : 0;
                responseHeight += unselected.height + this.constants.SPACE_PX;
                this.responsesText.push({unselected, selected});
                Phaser.Display.Align.In.Center(unselected, this.dialogueContainer);
                Phaser.Display.Align.In.Center(selected, this.dialogueContainer);
            }
        }

        let boxWidth = this.constants.TEXT_WIDTH + this.constants.BORDER_SIZE * 2;
        let contentHeight = this.title.height + this.text.height + responseHeight +
            this.constants.BORDER_SIZE * 2 + this.constants.SPACE_PX;
        if (contentHeight > this.constants.MAX_HEIGHT) {
            let unaffectedHeight = this.constants.BORDER_SIZE * 2 + this.title.height + this.constants.SPACE_PX;
            this.text.scaleY = (this.constants.MAX_HEIGHT - unaffectedHeight) / (contentHeight - unaffectedHeight);
            contentHeight = this.constants.MAX_HEIGHT;
        }
        let contentY = (this.constants.HEIGHT - contentHeight) / 2;
        this.bkg.clear();
        this.bkg.lineStyle(2, 0xffffff, 1);
        this.bkg.fillStyle(0, 0.75);
        this.bkg.strokeRect(0, 0, boxWidth, contentHeight);
        this.bkg.fillRect(0, 0, boxWidth, contentHeight);
        this.bkg.x = (this.constants.WIDTH - boxWidth) / 2;
        this.bkg.y = contentY;

        this.title.y = contentY + this.constants.BORDER_SIZE;
        this.text.y = this.title.y + this.title.height + this.constants.SPACE_PX;
        let responseY = this.text.y + this.text.displayHeight + this.constants.SPACE_PX;
        for (let i = 0; i < this.responsesText.length; i++) {
            this.responsesText[i].unselected.scaleY = this.responsesText[i].selected.scaleY = this.text.scaleY;
            this.responsesText[i].unselected.y = this.responsesText[i].selected.y = responseY;
            responseY += this.responsesText[i].unselected.displayHeight + this.constants.SPACE_PX * this.text.scaleY;
        }
    }
}
