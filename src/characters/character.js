import Phaser from 'phaser';
import { utilityFunctions } from '../utilityFunctions'

import {game} from '../index'
import Dialogue from '../Dialogue';

import store from '../store';
import DialogueScene from '../scenes/DialogueScene';





export default class Character extends Phaser.GameObjects.Image{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        this.scene = config.scene
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this)
        this.protag = this.scene.protag;
        this.body.immovable = true;
        // this.happiness = 50;
        this.variables = {
            Happiness: 50,
            Smarmy:    50,
            Arrogance: 50,
            Humility:  50
        }
        console.log(this.body)

        //bindings]
        // this.startConversation = this.startConversation.bind(this)
        // this.endConversation = this.endConversation.bind(this);
        this.enterConvo = this.enterConvo.bind(this);
        // this.startScene = this.startScene.bind(this)

        this.scene.physics.add.collider(this, this.protag, this.enterConvo);


    }
}

//these methods are shared between all characters!
Character.prototype.enterConvo = function() {
    let dialogue;
    if (this.dialogue  && !store.getDialogue()) {
        store.setDialogue(this.dialogue)
        this.scene.scene.launch('dialogue');
    }

    // let question = this.scene.add.text(0, 0, "Do you want to talk to " + this.name + "?", { font: "40px Berkshire Swash"})
    // Phaser.Display.Align.In.BottomCenter(question, this.scene.add.zone(400, 210, 0, 0))
}

// Character.prototype.startConversation = function() {
//     console.log("conversation beginning")
//     let textbox = new TextBox({
//         x: 500,
//         y: 600,
//         width: 800,
//         height: 200,
//         scene: this.scene,
//         key: 'Textbox'
//     })
//     Phaser.Display.Align.In.Center(this.question, this.scene.add.zone(400, 210, 0, 0))
//     this.scene.characterConvo = this;
//     this.body.checkCollision.none = true;
// }

// Character.prototype.startScene = function () {
//     console.log(this)
//     this.scene.scene.start('dialogue')
// }

// Character.prototype.startConversation = function () {
//     console.log("conversation beginning")
//     //I've left this here as an attempted workaround for a bug I was getting
//     this.enterConvo()
// };

// Character.prototype.endConversation = function () {

Character.prototype.updateVariables = function(updates) {
    Object.keys(updates).forEach(variable => {
        let value = updates[variable];
        switch (variable) {
            case 'Smarmy':
            case 'Arrogance':
            case 'Humility':
            case 'Happinees':
                // PERCENTAGES: 0 .. 100
                this.variables[variable] = Math.min(Math.max(0, this.variables[variable] + parseInt(value)), 100);
                break;
            default:
                break;
        }
    })
}