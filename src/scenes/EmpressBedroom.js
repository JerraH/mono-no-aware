
import {default as GameScene} from './GameScene.js';
import Phaser from 'phaser'
import { default as Akiko } from '../characters/akiko'

export default class EmpressBedroom extends GameScene {


    preload() {
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('empress', 'assets/images/empress.png')
        this.load.image('walls', 'assets/images/walls.png')
    }

    create() {
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup();

        //create background and set the world bounds equal to the size of the background
        this.groundLayer = this.background.create(500, 300, 'bedroom')
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height


        //Cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //Protagonist
        this.protag = this.physics.add.sprite(700, 500, 'protag');
        this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
        //set's the protag's hit box
        this.protag.body.height = 30
        this.protag.body.width = 120
        this.protag.body.offset = {x: 30, y: 150};

        //create and instantiate characters/sprites
        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 350,
            y: 350
        }, console.log(this))
        this.emp = this.physics.add.image(750, 340, 'empress')
        this.emp.angle = 28
        this.emp.body.rotation = 28 //not currently functioning for... reasons????
        this.emp.body.immovable = true;

        //this creates a collider between the protagonist and the empress that does nothing
        this.physics.add.collider(this.protag, this.emp)


       //Camera setup
       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

       //depth sorting




    }

}
