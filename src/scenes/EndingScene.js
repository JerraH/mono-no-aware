import {Scene} from 'phaser';

export default class EndingScene extends Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('archer', 'assets/images/archer.png')
        this.load.image('arched', 'assets/images/arched.png')
        this.load.image('palace', 'assets/images/palace.jpg')

    }

    create() {
        this.background = this.add.image(300, 300, 'palace')
        this.archer= this.add.image(150, 300, 'archer')

        setTimeout(() => {
            this.archer.destroy()
            this.add.image(150, 300, 'arched')
        }, 10000)
        setTimeout(() => {
            this.scene.start('playagain')
        }, 12000)

    }
}
