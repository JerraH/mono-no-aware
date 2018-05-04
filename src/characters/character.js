import Phaser, {GameObject, Image} from 'phaser';





export default class Character extends Phaser.GameObjects.Image{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        config.scene.add.existing(this);
        this.protag = this.scene.protag;

    }
    // initialize:
    // function Character(scene, x, y, type)

    // {
    //     // Phaser.GameObjects.Image.call(this, scene, 'character')
    //     this.scene = scene
    //     this.type = type
    //     console.log(scene)
    // }
}

Character.startConversation = function(convoKey) {
    var speech = this.game.cache.getJSON('speech');
    this.game.paused = true;
    this.activeConversation = convo;
    this.updateConversationState(this.activeConversation.start);
};



