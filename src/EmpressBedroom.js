
import {default as GameScene} from './GameScene.js';
import Phaser from 'phaser'

export default class EmpressBedroom extends GameScene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/largeroom.jpg')
    }
    create() {
        let NPCs = this.physics.add.staticGroup()


        let background = new Phaser.Image(this, 0, 0, 'bedroom')
       let akiko = NPCs.create(600, 400, 'akiko')



       this.cursors = this.input.keyboard.createCursorKeys();
       this.cat = this.physics.add.sprite(400, 300, 'cat')
       this.physics.add.collider(this.cat, NPCs)

    }

}
