
import Phaser  from 'phaser';
import store from '../store';

class DialogueCutscene extends Phaser.Scene {
        // constructor(config) {
        //     super(config.dialogueId);
        //     this.dialogueId = config.dialogueId
        //     let convo = store.getDialogue(this.dialogueId)
        //     this.state = {
        //         convo
        //     }

        // }
        preload() {
            this.load.image(this.convoRecipient.key, this.convoRecipient.img)
        }
        create() {
            let convo = this.state.convo;
            this.convoRecipient = convo.character
            this.scene.add.image(this.convoRecipient.key)

        }
    }



    export default DialogueCutscene
