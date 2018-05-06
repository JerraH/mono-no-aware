import Phaser, {GameObject, Image, Collider} from 'phaser';
import TextBox from '../TextBox';

import {game} from '../index'
import HandleKeyVertical from '../utilityFunctions'






export default class Character extends Phaser.GameObjects.Image{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this)
        this.protag = this.scene.protag;
        this.body.immovable = true;
        console.log(this.body)
        this.startConversation = this.startConversation.bind(this)

        this.scene.physics.add.collider(this, this.protag, this.startConversation);

    }
}

//these methods are shared between all characters!
Character.prototype.enterConvo = function() {
    let question = this.scene.add.text(0, 0, "Do you want to talk to " + this.name + "?", { font: "40px Berkshire Swash"})
    Phaser.Display.Align.In.BottomCenter(question, this.scene.add.zone(400, 210, 0, 0))
    // this.scene.background.create(new HandleKeyVertical({
    //     callback: this.startConversation,
    //     exitFunc: question.destroy,
    //     scene: this.scene,
    //     options: ['Yes', 'No']
    // }))
}

Character.prototype.startConversation = function() {
    console.log("conversation beginning")
    let textbox = new TextBox({
        x: 500,
        y: 600,
        width: 800,
        height: 200,
        scene: this.scene,
        key: 'Textbox'
    })
    this.enterConvo()

    // this.scene.background.create('Textbox')
    // console.log(textbox)
    // this.asyncCall = this.asyncCall.bind(this)

    // async function asyncCall() {
    //     let result = await this.scene.physics.world.pause();
    //     return result
    // }
    // asyncCall().then(this.scene.scene.start('dialogue'))
    this.inConversation = true;





    // var speech = this.game.cache.getJSON('speech');
    // this.game.paused = true;
    // this.activeConversation = convoKey;
    // this.updateConversationState(this.activeConversation.start);

};





Character.prototype.increaseHappiness = function(amount){
    let happinessHolder = this.state.happiness + amount;
    this.setState({happinessMeter: happinessHolder})
}

Character.prototype.decreaseHappiness = function(amount){
    let happinessHolder = this.state.happiness - amount;
    this.setState({happinessMeter: happinessHolder})
}



