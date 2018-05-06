import Phaser from 'phaser';
import { handleKeyVertical} from '../utilityFunctions'


export default class Character extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        this.scene = config.scene
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this)
        this.protag = this.scene.protag;
        this.body.immovable = true;
        console.log(this.body)

        //bindings
        this.handleKeyVertical = handleKeyVertical.bind(this.scene);
        this.startConversation = this.startConversation.bind(this)
        this.endConversation = this.endConversation.bind(this);
        this.startScene = this.startScene.bind(this)

        this.scene.physics.add.collider(this, this.protag, this.startConversation);

    }
}

//these methods are shared between all characters!
Character.prototype.enterConvo = function () {
    this.question = this.scene.add.text(0, 0, "Do you want to talk to " + this.name + "?", {
        font: "40px Berkshire Swash"
    })
    Phaser.Display.Align.In.Center(this.question, this.scene.add.zone(400, 210, 0, 0))
    this.scene.inConversation = true;
    this.scene.characterConvo = this;
    this.body.checkCollision.none = true;

    this.handleKeyVertical(this.startScene, this.endConversation, ['Yes', 'No'])


}
Character.prototype.startScene = function () {
    console.log(this)
    this.scene.scene.start('dialogue')
}

Character.prototype.startConversation = function () {
    console.log("conversation beginning")
    //I've left this here as an attempted workaround for a bug I was getting
    this.enterConvo()
};

Character.prototype.endConversation = function () {


    this.body.checkCollision.none = false;
    console.log(this.scene.children)
    this.scene.children.list.forEach((child) => {
        if ( child.type == 'Text' || child.type == 'Graphics') {
            child.visible = false;
        }
    })
    this.scene.physics.resume();
    this.scene.inConversation = false;
    this.body.checkCollision.none = false;



}


Character.prototype.increaseHappiness = function (amount) {
    let happinessHolder = this.state.happiness + amount;
    this.setState({
        happinessMeter: happinessHolder
    })
}

Character.prototype.decreaseHappiness = function (amount) {
    let happinessHolder = this.state.happiness - amount;
    this.setState({
        happinessMeter: happinessHolder
    })
}
