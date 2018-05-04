
import {default as GameScene} from './GameScene.js';
import Phaser from 'phaser'
import { default as Akiko } from './characters/akiko'

export default class EmpressBedroom extends GameScene {

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/largeroom.jpg')
    }
    create() {

        let background = this.physics.add.staticGroup();
        let NPCs = this.physics.add.staticGroup();
        let sprite = NPCs.create(600, 400, 'akiko')
        let bedroom = background.create(600, 400, 'bedroom')
        const akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 100,
            y: 600
        })
        console.log(akiko);

        // this.NPCs.add(akiko);







       this.cursors = this.input.keyboard.createCursorKeys();
       this.protag = this.physics.add.sprite(400, 300, 'protag')
       this.physics.add.collider(this.protag, this.akiko)
    //    NPCs.addChildren(akiko)


    }



}
