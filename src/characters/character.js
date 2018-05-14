import Phaser from 'phaser';

import store from '../store';

export default class Character extends Phaser.GameObjects.Image {
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
            Smarminess: 50,
            Arrogance: 50,
            Humility: 50
        }
        // console.log(this.body)

        //bindings]
        // this.startConversation = this.startConversation.bind(this)
        // this.endConversation = this.endConversation.bind(this);
        this.enterConvo = this.enterConvo.bind(this);
        // this.startScene = this.startScene.bind(this)
        if (this.scene.type !== 'cutscene') {
            this.scene.physics.add.collider(this, this.protag, this.enterConvo);

        }


    }
}

//these methods are shared between all characters!
Character.prototype.enterConvo = function () {
    if (this.dialogue && !store.getDialogue()) {
        store.setDialogue(this.dialogue)
        this.scene.scene.launch('dialogue');
    }
}


Character.prototype.updateVariables = function (updates) {
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
