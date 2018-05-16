import Akiko from '../characters/akiko'

export default class DrinkingBuddies extends DialogueCutscene {
    preload() {
        super.preload();
        this.load.image('Akiko-sit', 'assets/images/characters/Akiko-sit.png')
        this.load.image('akiko-sit-fox', 'assets/images/characters/akiko-sit-fox.png')
    }

    overlayBackground() {
        let Akiko = new Akiko({
            scene: this,
            key: 'Akiko-sit',
            x: 250,
            y: 300
        })
        this.physics.world.disable(Akiko)
    }
}
