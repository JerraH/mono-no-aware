import Phaser from 'phaser';

export default class EndingScene extends Phaser.Scene {

    preload() {
        this.load.image('archer', 'assets/images/archer.png')
        this.load.image('arched', 'assets/images/arched.png')
        this.load.image('palace', 'assets/images/palace.jpg')

    }

    create() {
        this.background = this.add.image(400, 300, 'palace')
        this.archer = this.add.image(260, 300, 'archer')

        setTimeout(() => {
            this.archer.destroy()
            this.add.image(260, 300, 'arched')
        }, 10000)
        setTimeout(() => {
            this.scene.start('playagain')
        }, 15000)

    }
}
