import Phaser, {GameObject, Image} from 'phaser';





<<<<<<< HEAD
export default class Character extends Phaser.GameObjects.Image{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.type = 'character';
        config.scene.add.existing(this);
        this.protag = this.scene.protag;

=======
export const Character = new Phaser.Class({
    Extends: Phaser.GameObject,
    initialize:
    function Character(scene, x, y, type)
    {
        // GameObject.call(this, scene, 'character')
        this.scene = scene
        this.type = type
        // this.setPosition(x, y)
>>>>>>> 6f6c1abebba1a97fe799831d867d17952e2f9ccd
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



