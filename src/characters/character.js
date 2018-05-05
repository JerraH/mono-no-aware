import Phaser, {GameObject, Image, Collider} from 'phaser';






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








    }
    // handleKey() {

    // }
    create() {
        if(this.touching) {
            console.log("i am touching you")
        }
        this.bending = false
        let characterMap = new Phaser.Geom.Rectangle(0, 0, 100, 100)
        this.characterMap.immovable = true;
        this.touching = {left: true, right: true, down: true, up: true}

        this.body.onCollide = true;

        console.log(this)

        this.properties.onCollide = this.startConversation()



        // Phaser.Physics.Arcade.collide(this.body, this.protag, this.startConversation)








    }

    update() {


    // initialize:
    // function Character(scene, x, y, type)

    // {
    //     // Phaser.GameObjects.Image.call(this, scene, 'character')
    //     this.scene = scene
    //     this.type = type
    //     console.log(scene)
    // }
}
}

Character.prototype.checkCollision = function () {
    console.log(this.x)
    console.log(this.protag.x)
    if (this.body.x + this.body.width === this.protag.x || this.body.x === this.protag.x + this.protag.width) {
    console.log("scream")

}
}

Character.prototype.startConversation = function() {
    console.log("scream")
    console.log(this)
    this.inConversation = true;
    this.scene.scene.start('dialogue')
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



