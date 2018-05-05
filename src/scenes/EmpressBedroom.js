
import {default as GameScene} from './GameScene.js';
import Phaser from 'phaser'
import { default as Akiko } from '../characters/akiko'

export default class EmpressBedroom extends GameScene {

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('empress', 'assets/images/emp.png')
        this.load.image('walls', 'assets/images/walls.png')
    }
    create() {
        //create static groups
        let background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup();


        // let sprite = NPCs.create(600, 400, 'akiko')
        this.groundLayer = background.create(500, 300, 'bedroom')


        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height


        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 0,
            y: 0
        })
        this.emp = this.NPCs.create(400, 500, 'empress')

        this.NPCs.add(this.akiko);
        this.NPCs.add(this.emp)

        let akikoContainer = this.add.container(350, 350)
        akikoContainer.add(this.akiko);

        // this.akiko.setInteractive(circle, console.log("yes hello"))

        this.emp.angle = -160




        //Cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //Protagonist
        this.protag = this.physics.add.sprite(500, 300, 'protag');
        this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);






       this.physics.add.collider(this.protag, this.akiko, console.log("yelling"))


       //Camera info
       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)


    }



}
