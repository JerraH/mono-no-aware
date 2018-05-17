import Phaser from 'phaser';
import store from '../store';

export default class EndingScene extends Phaser.Scene {

    preload() {
        this.load.image('archer', 'assets/images/archer.png')
        this.load.image('arched', 'assets/images/arched.png')
        this.load.image('palace', 'assets/images/palace.jpg')
        this.load.audio('ending', 'assets/audio/ending.m4a')        
    }

    create() {
        this.background = this.add.image(400, 300, 'palace')
        this.archer = this.add.image(260, 300, 'archer')

        let music = store.getMusic();
        if (music) {
            music.stop();
            store.setMusic();
        }

        let theme = this.sound.add('ending');
        theme.play({ volume: 0.5 });

        setTimeout(() => {
            this.archer.destroy()
            this.add.image(260, 300, 'arched')
        }, 10000)
        setTimeout(() => {
            this.scene.start('playagain')
        }, 15000)

    }
}
