
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
            this.load.image(this.config.convo.actor.key, this.actor.img)
        }
        create() {
            let convo = this.state.convo;
            this.actor = convo.actor
            this.scene.add.image(50, 300, this.actor.key)
            this.add.container(600, 300)

        }

    }



    export default DialogueCutscene
