
import {default as GameScene} from './GameScene.js';
import Phaser from 'phaser'
import { default as Akiko } from '../characters/akiko'

export default class Garden extends GameScene {

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('garden', 'assets/images/garden.jpg')
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('empress', 'assets/images/emp.png')
        this.load.image('walls', 'assets/images/walls.png')
    }
    create() {
        super.create();

        //create static groups
        let background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup();


        // let sprite = NPCs.create(600, 400, 'akiko')
        this.groundLayer = background.create(500, 300, 'garden')


        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height


        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 200,
            y: 300
        })
        this.emp = this.NPCs.create(400, 300, 'empress')
        let circle = new Phaser.Geom.Circle(0, 0, 60)

        this.NPCs.add(this.akiko);
        this.NPCs.add(this.emp)

        this.emp.angle = -160

        //Protagonist
        this.protag = this.physics.add.sprite(400, 300, 'protag');
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);


    //    this.physics.add.collider(this.protag, this.akiko, this.akiko.startConversation)


       //Camera info
       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)


    }


}
