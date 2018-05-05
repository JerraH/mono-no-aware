import Character from './character'

export default class General extends Character {
    constructor(config) {
      super(config);
      this.state = {
        happinessMeter: 50,
        inConversation: false
      }

    }


    beginConvo(character, protag) {
        this.scene.physics.world.collide(this, this.protag);

    }
    handleKey(event) {
        if()
        beginConvo(this)
    }
}


