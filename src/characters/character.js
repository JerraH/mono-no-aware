import Phaser, {GameObject} from 'phaser';





export const Character = new Phaser.Class({
    Extends: Phaser.GameObject,
    initialize:
    function Character(scene, x, y, type)
    {
        // GameObject.call(this, scene, 'character')
        this.scene = scene
        this.type = type
        // this.setPosition(x, y)
    }
})

Character.startConversation = function(convoKey) {
    var speech = this.game.cache.getJSON('speech');
    this.game.paused = true;
    this.activeConversation = convo;
    this.updateConversationState(this.activeConversation.start);
};



