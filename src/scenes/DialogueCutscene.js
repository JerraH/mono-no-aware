import Phaser from 'phaser';
import store from '../store';
import Dialogue from '../Dialogue';
import General from '../characters/general';


let style = {
    font: '18px Cabin',
    fill: 'black',
    align: 'left',
    wordWrap: {
        width: 300,
        useAdvancedWrap: true
    }
};
let INTRO_DIALOGUE = [{
    type: 'Node',
    id: 'b17c37fb-5006-4bf1-b5c0-d8ce645d4064',
    actor: 'General',
    name: "Thank the gods you've returned.  We tried to reach you.  Our messenger rode hard for three days -- damn near rode his horse to death -- but returned without your reply.  And not a moment too soon, I suspect.",
    choices: ['5f0e42c9-f71f-4759-8457-002546c31327', 'ce021b8f-d7b4-4fb1-baee-2bc93a8f970e']
}, {
    type: 'Choice',
    id: '5f0e42c9-f71f-4759-8457-002546c31327',
    title: 'Kind',
    name: '"What is it?  Is something wrong?',
    next: '54d1b19d-3bd9-4683-98b3-88fd0f4589cd'
}, {
    type: 'Choice',
    id: 'ce021b8f-d7b4-4fb1-baee-2bc93a8f970e',
    title: 'Full of self',
    name: "\"Not to worry, I'll take over from here.\"",
    next: 'faf6f991-9eef-41ae-b45e-e2232588526b'
}, {
    type: 'Set',
    id: 'faf6f991-9eef-41ae-b45e-e2232588526b',
    variable: 'Humility',
    value: '-20',
    next: '098b20b3-cf2e-4bc1-86b2-e7b6921fff05'
}, {
    type: 'Set',
    id: '098b20b3-cf2e-4bc1-86b2-e7b6921fff05',
    variable: 'Smarmy',
    value: '+10',
    next: '237d7dc7-f1a3-4dca-b46e-3781080f84c8'
}, {
    type: 'Text',
    id: '54d1b19d-3bd9-4683-98b3-88fd0f4589cd',
    actor: 'General',
    name: 'You descend from your carriage as quickly as grace will allow.\n\n"What is it?  Is something wrong?\n\n"Worse than you fear," said the General; your stomach lurches as if you were still on the carriage.  "Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.',
    choices: ['c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf', '802f6f7a-db47-4580-9507-85fe8484f693']
}, {
    type: 'Text',
    id: '237d7dc7-f1a3-4dca-b46e-3781080f84c8',
    actor: 'General',
    name: "\"Alright, alright, calm down. Not to worry, General, I'll take over from here. What seems to be the trouble?\"\n\nThe general sighs.\n\n\"I see your pilgrimage has done nothing for your humility,\" he says, though you count the strained amusement in his voice as a victory.  \"Not that I had expected it would, and the Empress appears to favor you as you are.\"",
    choices: ['42ad5e36-e8e0-479d-8fc2-e7c91e54acc2', 'e605dd13-d01b-4f56-b4a7-003e347b3bb7', 'be2b850d-64c9-4637-a22e-eccac03361ed']
}, {
    type: 'Choice',
    id: '42ad5e36-e8e0-479d-8fc2-e7c91e54acc2',
    title: 'Dismissive',
    name: '"You would do well to remember it."',
    next: 'c18dbf20-4d54-4553-b936-e170e787247b'
}, {
    type: 'Text',
    id: '3f121698-23c2-4fc4-8998-0648864e7d34',
    actor: 'General',
    name: '"That she does, and you would do well to remember it," you say, sweeping forward to stand beside him.  He is somehow unimpressive  despite his height and the richness of his clothing.\n\nHe frowns, but continues anyway.\n\n"I hope you hold her in equal esteem, because she needs your prayers and whatever other assistance you can suggest."',
    next: null
}, {
    type: 'Set',
    id: 'c18dbf20-4d54-4553-b936-e170e787247b',
    variable: 'Humility',
    value: '-20',
    next: '763c859e-6ff7-4676-b8ce-8c7e1e0705af'
}, {
    type: 'Set',
    id: '763c859e-6ff7-4676-b8ce-8c7e1e0705af',
    variable: 'Arrogance',
    value: '+20',
    next: '3f121698-23c2-4fc4-8998-0648864e7d34'
}, {
    type: 'Choice',
    id: 'e605dd13-d01b-4f56-b4a7-003e347b3bb7',
    title: 'Humble',
    name: '"Does she?"',
    next: '8a732f85-cfcc-422a-822d-76bbe729ef9a'
}, {
    type: 'Choice',
    id: 'be2b850d-64c9-4637-a22e-eccac03361ed',
    title: 'Grateful',
    name: "\"That's good to hear.\"",
    next: '873b1892-a7b6-422e-aceb-5e81587f6bb6'
}, {
    type: 'Text',
    id: 'c263119a-e95b-409f-866a-7418df9c906d',
    actor: 'General',
    name: "\"I am glad to hear you say so,\" you say, striding up to stand beside him; despite your levity, the creases beside his eyes do not soften.  \"She is very dear to me.\"\n\n\"That's why we made every attempt to reach you,\" the General said, and that same worry clutches at your stomach again.  \n\n\"Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.\"",
    next: null
}, {
    type: 'Set',
    id: '8a732f85-cfcc-422a-822d-76bbe729ef9a',
    variable: 'Humility',
    value: '+10',
    next: '0105f58c-58c0-4c9c-8840-df6b99f67cbc'
}, {
    type: 'Text',
    id: '0105f58c-58c0-4c9c-8840-df6b99f67cbc',
    actor: 'General',
    name: 'Despite everything, you find that hearing the words in such a tangible, concrete way invites  your cheeks to flush, your heart beating faster.\n\n"Does she?" you ask, unable to come up with anything more intelligent in the face of your own ',
    next: null
}, {
    type: 'Set',
    id: '873b1892-a7b6-422e-aceb-5e81587f6bb6',
    variable: 'Humility',
    value: '+5',
    next: 'c263119a-e95b-409f-866a-7418df9c906d'
}, {
    type: 'Choice',
    id: 'c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf',
    title: 'Sensitive',
    name: '"Oh, gods... what do the doctors say?',
    next: '6b5451ad-2fe4-4d7d-9256-553a107fe31f'
}, {
    type: 'Text',
    id: '6b5451ad-2fe4-4d7d-9256-553a107fe31f',
    actor: 'General',
    name: "A wellspring of tears, sudden and hot, stings the corners of your eyes.  It's not grief, not yet -- more like shock, cold and entire, like an afternoon storm on horseback.\n\n\"Oh gods,\" you say, just to steal a moment to think; everything seems now to be moving so quickly.  \"What do the doctors say?\" you finally manage to ask, although you're sure you know the answer: if they had anything useful to add, the Empress would not be in such a state.  Your face feels somehow bloodless, like it's all drained down to your heart, which throbs, hot and overlarge, in your chest.",
    next: null
}, {
    type: 'Choice',
    id: '802f6f7a-db47-4580-9507-85fe8484f693',
    title: 'Decisive',
    name: '"What has been done so far to ease the illness?"',
    next: '78a79d5f-5f62-4360-a69e-d5aa661c0f1f'
}, {
    type: 'Text',
    id: '95ea6e15-4442-4e58-a6e9-030a42ba6ebb',
    actor: 'General',
    name: "You have never been one to waste time, and you certainly don't begin now; you're off towards her rooms at the palace like an able huntsman's arrow.\n\n\"What has been done so far?\" you ask the general, at he takes off beside you, his strides equal in measure to your own.  \n\n\"They've tried the best medicines the mainland has to offer,\" he says, and you know it to be true: Monk Jianzhen is a master at his craft, having learned at the court of the Chinese emperor himself, apparently unhindered by his blindness \"She shows no response to his work, either good or ill.\"",
    choices: ['2837dcab-43f0-462b-9a57-7ec9078ec8b0', 'bc6c94a8-ee4b-492b-84d3-53cda7aeccdc'],
    next: null
}, {
    type: 'Set',
    id: '78a79d5f-5f62-4360-a69e-d5aa661c0f1f',
    variable: 'Decisiveness',
    value: '+20',
    next: '95ea6e15-4442-4e58-a6e9-030a42ba6ebb'
}, {
    type: 'Choice',
    id: 'bc6c94a8-ee4b-492b-84d3-53cda7aeccdc',
    title: 'Judgmental',
    name: "\"The doctor is losing his touch. \n Have you summoned the monks from the Kofuku temple?\" you snap, and don't think you can be blamed if you don't think too highly of the good doctor at the moment",
    next: '3f428b38-c737-47e2-aae6-20ae17c31161'
}, {
    type: 'Text',
    id: '41372625-8ceb-46e6-a6c4-e45deb32bf08',
    actor: 'General',
    name: '"If Monk Jianzhen cannot cure her, perhaps her disease is caused by something supernatural in origin," you say, moving into the grey-dark depths of the palace, lit on this overcast day by the orange glow of oil lanterns.  You wonder',
    next: null
}, {
    type: 'Choice',
    id: '2837dcab-43f0-462b-9a57-7ec9078ec8b0',
    title: 'Knowledgeable',
    name: '"Then perhaps her illness is caused by something supernatural in origin."',
    next: '82f8d9d1-e127-4b4b-af24-8c165b41a680'
}, {
    type: 'Set',
    id: '82f8d9d1-e127-4b4b-af24-8c165b41a680',
    variable: 'Knowledgeable',
    value: '+10',
    next: '41372625-8ceb-46e6-a6c4-e45deb32bf08'
}, {
    type: 'Set',
    id: '3f428b38-c737-47e2-aae6-20ae17c31161',
    variable: 'Judgmental',
    value: '+10',
    next: '6c56edc5-ff89-4173-ba8b-1320142c2cbd'
}, {
    type: 'Text',
    id: '6c56edc5-ff89-4173-ba8b-1320142c2cbd',
    actor: '',
    name: '',
    next: null
}]


class DialogueCutscene extends Phaser.Scene {
    constructor(config) {
        super(config)
        this.type = 'cutscene'
        this.handleKey = this.handleKey.bind(this);
        this.addText = this.addText.bind(this);
        this.constants = {
            WIDTH: 800,
            HEIGHT: 600,
            TEXT_WIDTH: 260,
            BORDER_SIZE: 25,
            BOX_WIDTH: this.TEXT_WIDTH + this.BORDER_SIZE + 50,
            MAX_HEIGHT: 600,
            SPACE_PX: 15,
            TITLE_HEIGHT: 50,
            LINE_HEIGHT: 40,
            SELECTION_HEIGHT: 54
        }
        store.setTextboxConstants(this.constants)
    }
    addText(dialogue) {
         if (this.text) {
            this.text.destroy()
        }
        this.text = this.add.text(0, 150, dialogue.text, style)
        Phaser.Display.Align.In.Center(this.text, this.dialogueContainer)
        this.text.y = 100
    }

    renderCutscene() {
        let dialogue = store.getDialogue();

        this.selectionIndex = 0;
        this.responses = dialogue.responses;

        //add the main body text
       this.addText(dialogue)

        //add the dialogue title
        if (this.title) {
            this.title.destroy();
        }
        this.title = this.add.text(550, 80, dialogue.name, {
            font: '40px Berkshire Swash',
            fill: 'black'
        });
        Phaser.Display.Align.In.Center(this.title, this.dialogueContainer)
        this.title.setDepth(2000)

        let maxWidth = 0;

        //make sure your responsesText array is empty
        this.responsesText.forEach(response => response.destroy());
        this.responsesText.length = 0;
        for (let i = 0; i < this.responses.length; i++) {
            // console.log(this.responses[i])
            let response = this.add.text(0, 0, this.responses[i].text, style);
            this.responsesText.push(response);
            Phaser.Display.Align.In.Center(response, this.dialogueContainer);
            response.y = (this.text.y + this.text.height) + 50 + (40 * i)
            maxWidth = Math.max(maxWidth, response.width);
        }
        maxWidth += 20;


        for (let i = 0; i < 2; i++) {
            let selection = this.selection[i];
            selection.clear();
            if (this.responses.length) {
                selection.lineStyle(3.5, (i === 0) ? 0 : 0xffcf00, 1);
                selection.strokeRect(0, 0, 298, 44);
                selection.x = 450;
                selection.y = this.getSelectionY();
                selection.setDepth(3000)
            }
        }
    }
    handleResponse() {
        if (this.selectionTween) {
            this.selectionTween.stop();
            this.selectionTween = null;
        }

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
            this.sound.add('select').play({
                volume: 0.5
            });
            this.renderCutscene(this.dialogueContainer);
        } else {
            // no child, so exit dialogue
            this.sound.add('close').play({
                volume: 0.5
            });
            this.input.keyboard.off('keydown', this.handleKey)
            this.scene.launch('HUD')
            this.scene.start('EmpressBedroom');
        }
    }
    //sound and animation for movement of selection box
    soundAndAnim() {
        this.sound.add('tap').play({volume: 0.5});
        this.updateSelectionTween();
    }
    handleKey(event) {
        if (event.repeat) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.selectionIndex--;
                    this.soundAndAnim()
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < this.responses.length-1) {
                    this.selectionIndex++;
                    this.soundAndAnim()
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

    getSelectionY() {
        return (this.text.y + this.text.height) + 40 + (40 * this.selectionIndex)
    }
    preload() {
        this.load.audio('chat', 'assets/audio/chat.m4a')
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('close', 'assets/audio/close.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
        this.load.image('general', 'assets/images/characters/general.png')
        this.load.image('introbackground', 'assets/images/introbg.png')
        this.load.image('dialoguebg', 'assets/images/intro-dialogue-bg.png')
    }
    create() {

        this.add.image(250, 300, 'introbackground')
        let dialoguebg = this.add.image(0, 300, 'dialoguebg')
        let general = new General({
            scene: this,
            key: 'general',
            x: 250,
            y: 300
        })
        this.dialogueContainer = this.add.container(600, 40)

        Phaser.Display.Align.In.Center(dialoguebg, this.dialogueContainer);
        dialoguebg.y = 300;
        this.physics.world.disable(general)


        this.actor = general;
        this.words = [];
        this.title = null;
        this.responsesText = [];
        this.selection = [];
        for (let i = 0; i < 2; i++) {
            this.selection.push(this.add.graphics(200, 44));
        }
        this.dialogue = new Dialogue(INTRO_DIALOGUE);
        // console.log('my responses are', this.dialogue.responses)
        store.setDialogue(this.dialogue);


        this.renderCutscene(this.dialogueContainer);

        this.blink = 0;

        this.sound.add('chat').play({
            volume: 0.1
        });

        this.input.keyboard.on('keydown', this.handleKey);
        // this.words.style = { font: "20px Cabin"}


        // this.dialogueWindow = this.scene.launch('dialogue', general)



    //     update(time, delta) {
    //         this.blink += delta;
    //         this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
    //         this.selection[1].alpha = Math.min(1, Math.abs(this.blink % 1000 - 500) / 500);
       }

}


export default DialogueCutscene
