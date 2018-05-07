
import {default as GameScene} from './GameScene.js';
import Phaser, {Body} from 'phaser'
import { default as Akiko } from '../characters/akiko'
import Protag from '../characters/protag';

export default class EmpressBedroom extends GameScene {
    constructor(props) {
        super(props)


    }




    preload() {
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('empress', 'assets/images/empress.png')
        this.load.image('walls', 'assets/images/walls.png')
    }

    create() {
        let currScene = this;
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup()


        //create background and set the world bounds equal to the size of the background
        this.groundLayer = this.background.create(500, 300, 'bedroom')
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height


        //Cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // Protagonist
        this.protag = this.physics.add.sprite(500, 300, 'protag');

        //set's the protag's hit box
        this.protag.body.height = 30
        this.protag.body.width = 120
        this.protag.body.offset = {x: 30, y: 150};
        this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);


        //makes zones

        this.room2Door = this.add.zone(350, 100, 200, 200).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.allowRotation = true;
        this.room2Door.body.isCircle = true;
        this.room2Door.body.immovable = true;
        this.changeRooms = () => {
            console.log(currScene)
            async function func() {
                currScene.input.enabled = false;
                await currScene.physics.pause()
            }
            //this is a hack to allow the room to load before trying to move the protag, which was happening in the wrong order and throwing an error.  I know it's an anti-pattern, but I tried just using async/await and it didn't seem to help, so...
            func().then(setTimeout(() => {
                this.scene.start('room2')
            }, 10))
            // .then(this.scene.start('room2'))

        }
        this.changeRooms = this.changeRooms.bind(this)

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)


<<<<<<< HEAD
=======
        //Cursors
        this.addKeys();
>>>>>>> 73ba02c6c4985cf64b60343e1bdd5ce22cf8d47e


        //create and instantiate characters/sprites
        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 350,
            y: 350
        })

        this.emp = this.physics.add.image(750, 340, 'empress');
        this.emp.angle = 28;
        this.emp.body.immovable = true;
        // this.emp.body.setRotation = 28 //not currently functioning for... reasons????
        this.physics.add.collider(this.protag, this.emp)
        console.log(this.emp.body)

        //this creates a collider between the protagonist and the empress that does nothing


       //Camera setup
       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

       //depth sorting
       if (this.protag.velocity !== 0) {
        this.akiko.depth = this.akiko.y + this.akiko.height / 2;
    }



    }


}
