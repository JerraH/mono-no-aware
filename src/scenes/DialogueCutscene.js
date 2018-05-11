
import Phaser  from 'phaser';
import store from '../store';
import Dialogue from '../Dialogue'
import General from '../characters/general'
import Protag from '../characters/protag'
import DialogueScene from './DialogueScene'



let INTRO_DIALOGUE = [
    {
        "type": "Node",
        "id": "b17c37fb-5006-4bf1-b5c0-d8ce645d4064",
        "actor": "General",
        "name": "Thank the gods you've returned.  We tried to reach you.  Our messenger rode hard for three days -- damn near rode his horse to death -- but returned without your reply.  And not a moment too soon, I suspect.",
        "choices": [
            "5f0e42c9-f71f-4759-8457-002546c31327",
            "ce021b8f-d7b4-4fb1-baee-2bc93a8f970e"
        ]
    },
    {
        "type": "Choice",
        "id": "5f0e42c9-f71f-4759-8457-002546c31327",
        "title": "Kind",
        "name": "\"What is it?  Is something wrong?",
        "next": "54d1b19d-3bd9-4683-98b3-88fd0f4589cd"
    },
    {
        "type": "Choice",
        "id": "ce021b8f-d7b4-4fb1-baee-2bc93a8f970e",
        "title": "Full of self",
        "name": "\"Not to worry, I'll take over from here.\"",
        "next": "faf6f991-9eef-41ae-b45e-e2232588526b"
    },
    {
        "type": "Set",
        "id": "faf6f991-9eef-41ae-b45e-e2232588526b",
        "variable": "Humility",
        "value": "-20",
        "next": "098b20b3-cf2e-4bc1-86b2-e7b6921fff05"
    },
    {
        "type": "Set",
        "id": "098b20b3-cf2e-4bc1-86b2-e7b6921fff05",
        "variable": "Smarmy",
        "value": "+10",
        "next": "237d7dc7-f1a3-4dca-b46e-3781080f84c8"
    },
    {
        "type": "Text",
        "id": "54d1b19d-3bd9-4683-98b3-88fd0f4589cd",
        "actor": "General",
        "name": "You descend from your carriage as quickly as grace will allow.\n\n\"What is it?  Is something wrong?\n\n\"Worse than you fear,\" said the General; your stomach lurches as if you were still on the carriage.  \"Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.",
        "choices": [
            "c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf"
        ]
    },
    {
        "type": "Text",
        "id": "237d7dc7-f1a3-4dca-b46e-3781080f84c8",
        "actor": "General",
        "name": "\"Alright, alright, calm down. Not to worry, I'll take over from here. What seems to be the trouble?\"\n\nThe general sighs.\n\n\"I see your pilgrimage has done nothing for your humility,\" he says, though you count the strained amusement in his voice as a victory.  \"Not that I had expected it would, and the Empress appears to favor you as you are.\"",
        "choices": [
            "42ad5e36-e8e0-479d-8fc2-e7c91e54acc2",
            "e605dd13-d01b-4f56-b4a7-003e347b3bb7",
            "be2b850d-64c9-4637-a22e-eccac03361ed"
        ]
    },
    {
        "type": "Choice",
        "id": "42ad5e36-e8e0-479d-8fc2-e7c91e54acc2",
        "title": "Dismissive",
        "name": "\"You would do well to remember it.\"",
        "next": "c18dbf20-4d54-4553-b936-e170e787247b"
    },
    {
        "type": "Text",
        "id": "3f121698-23c2-4fc4-8998-0648864e7d34",
        "actor": "General",
        "name": "\"That she does, and you would do well to remember it,\" you say, sweeping forward to stand beside him.  He is somehow unimpressive  despite his height and the richness of his clothing.\n\nHe frowns, but continues anyway.\n\n\"I hope you hold her in equal esteem, because she needs your prayers and whatever other assistance you can suggest.\"",
        "next": null
    },
    {
        "type": "Set",
        "id": "c18dbf20-4d54-4553-b936-e170e787247b",
        "variable": "Humility",
        "value": "-20",
        "next": "763c859e-6ff7-4676-b8ce-8c7e1e0705af"
    },
    {
        "type": "Set",
        "id": "763c859e-6ff7-4676-b8ce-8c7e1e0705af",
        "variable": "Arrogance",
        "value": "+20",
        "next": "3f121698-23c2-4fc4-8998-0648864e7d34"
    },
    {
        "type": "Choice",
        "id": "e605dd13-d01b-4f56-b4a7-003e347b3bb7",
        "title": "Humble",
        "name": "\"Does she?\"",
        "next": "8a732f85-cfcc-422a-822d-76bbe729ef9a"
    },
    {
        "type": "Choice",
        "id": "be2b850d-64c9-4637-a22e-eccac03361ed",
        "title": "Grateful",
        "name": "\"That's good to hear.\"",
        "next": "873b1892-a7b6-422e-aceb-5e81587f6bb6"
    },
    {
        "type": "Text",
        "id": "c263119a-e95b-409f-866a-7418df9c906d",
        "actor": "General",
        "name": "\"I am glad to hear you say so,\" you say, striding up to stand beside him; despite your levity, the creases beside his eyes do not soften.  \"She is very dear to me.\"\n\n\"That's why we made every attempt to reach you,\" the General said, and that same worry clutches at your stomach again.  \n\n\"Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.\"",
        "next": null
    },
    {
        "type": "Set",
        "id": "8a732f85-cfcc-422a-822d-76bbe729ef9a",
        "variable": "Humility",
        "value": "+10",
        "next": "0105f58c-58c0-4c9c-8840-df6b99f67cbc"
    },
    {
        "type": "Text",
        "id": "0105f58c-58c0-4c9c-8840-df6b99f67cbc",
        "actor": "General",
        "name": "Despite everything, you find that hearing the words in such a tangible, concrete way invites  your cheeks to flush, your heart beating faster.\n\n\"Does she?\" you ask, unable to come up with anything more intelligent in the face of your own ",
        "next": null
    },
    {
        "type": "Set",
        "id": "873b1892-a7b6-422e-aceb-5e81587f6bb6",
        "variable": "Humility",
        "value": "+5",
        "next": "c263119a-e95b-409f-866a-7418df9c906d"
    },
    {
        "type": "Choice",
        "id": "c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf",
        "title": "Crying",
        "name": "\"Oh, gods... what do the doctors say?",
        "next": "6b5451ad-2fe4-4d7d-9256-553a107fe31f"
    },
    {
        "type": "Text",
        "id": "6b5451ad-2fe4-4d7d-9256-553a107fe31f",
        "actor": "General",
        "name": "A wellspring of tears, sudden and hot, stings the corners of your eyes.  It's not grief, not yet -- more like shock, cold and entire, like an afternoon storm on horseback.\n\n\"What do the doctors say?\" you ask, although you're sure you know the answer: if they had anything useful to add, the Empress would not be in such a state.",
        "next": null
    }
];

class DialogueCutscene extends DialogueScene {
        constructor(config) {
            super(config)
            this.dialogue = new Dialogue(INTRO_DIALOGUE, this);
            this.type = 'cutscene'
            store.setDialogue(this.dialogue);
            this.constants = {
                WIDTH: 300,
                HEIGHT: 600,
                TEXT_WIDTH: 300,
                BORDER_SIZE: 25,
                BOX_WIDTH: this.TEXT_WIDTH + this.BORDER_SIZE + 50,
                MAX_HEIGHT: 600,
                SPACE_PX: 15,
                TITLE_HEIGHT: 50,
                LINE_HEIGHT: 40,
                SELECTION_HEIGHT: 54
               }


        }

    render() {
        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        // justify text
        this.wordWidth = 0;
        this.wordHeight = 0;
        this.justifyText(dialogue.text.trim(), this.constants.TEXT_WIDTH);
        this.contentHeight = this.wordHeight * 0.5 +
            this.constants.SELECTION_HEIGHT * this.responses.length +
            this.constants.BORDER_SIZE * 2 +
            this.constants.TITLE_HEIGHT;

        // scale text height
        let wordScaleY = 0.5;
        if (this.contentHeight > this.constants.MAX_HEIGHT) {
            // compress text so it fits
            wordScaleY *= (this.wordHeight - (this.contentHeight - this.constants.MAX_HEIGHT)) / this.wordHeight;
            this.contentHeight = this.constants.MAX_HEIGHT;
        }
        this.contentY = (600 - this.contentHeight) / 2;

        this.bkg.clear();
        this.bkg.lineStyle(10, 0x521913, 1);
        this.bkg.fillStyle(0xd5ccbe)
        this.bkg.fillRect(500, 0, 300, 600)
        this.bkg.strokeRect(500, 0, 300, 600);
        this.bkg.y = this.contentY;

        // too tall, so compress lines
        this.words.forEach(word => {
            word.x += (this.constants.WIDTH - this.wordWidth) / 2;
            word.y = this.contentY + this.constants.BORDER_SIZE + this.constants.TITLE_HEIGHT + word.y * wordScaleY;
            word.scaleY = wordScaleY;
        })

        if (this.title) {
            this.title.destroy();
        }
        this.title = this.add.text(0, 0, dialogue.name, { font: "40px Berkshire Swash" });
        Phaser.Display.Align.In.RightCenter(this.title, this.add.zone(0,
            0, 300, 600));

        let maxWidth = 0;
        this.responsesText.forEach(response => response.destroy());
        this.responsesText.length = 0;
        for (let i = 0; i < this.responses.length; i++) {
            let response = this.add.text(0, 0, this.responses[i].text, { font: "25px Amatic SC" });
            response.setDepth = 3000;
            this.responsesText.push(response);
            Phaser.Display.Align.In.RightCenter(response, this.add.zone(this.constants.WIDTH / 2,
                this.contentY + this.contentHeight - this.constants.BORDER_SIZE - (this.responses.length - i - 0.5) * this.constants.SELECTION_HEIGHT,
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
                selection.x = (this.constants.WIDTH - maxWidth) / 2;
                selection.y = this.getSelectionY();
            }
        }
    }
        preload() {
            super.preload()
            this.load.image('general', 'assets/images/characters/general.png')
            this.load.image('background', 'assets/images/introbg.png')
        }
        create() {
            super.create()
            let background = this.add.image(300, 300, 'background')
            let general = new General({
                scene: this,
                key: 'general',
                x: 300,
                y: 300
            })
            this.bkg = this.add.graphics();
            this.selection = this.add.graphics();

            this.words = [];
            this.responsesText = [];
            this.title = null;
            this.selection = [];
            for (let i = 0; i < 2; i++) {
                this.selection.push(this.add.graphics(200, 54));
            }

            let dialogueBlock = this.render();

            this.blink = 0;

            this.sound.add('chat').play({ volume: 0.1 });

            this.input.keyboard.on('keydown', this.handleKey);
            this.dialogueContainer = this.add.container(500, 300)

            // this.dialogueWindow = this.scene.launch('dialogue', general)
            this.dialogueContainer.add(this.dialogueBlock)


        }

    }



    export default DialogueCutscene
