
import {default as GameScene} from './GameScene.js';
import { default as Akiko } from '../characters/akiko'
import Empress from '../characters/Emp'
import Item from '../Item'

export default class EmpressBedroom extends GameScene {
    constructor(config) {
        super(config)
        this.changeRooms = this.changeRooms.bind(this)

    }

    preload() {
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('empress', 'assets/images/Empress.png')
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('walls', 'assets/images/walls.png')
        this.load.image('toy', 'assets/catToy.png')
        this.load.image('triangle', 'assets/greenTriangle.png');
    }
    createBg() {
        this.groundLayer = this.background.create(500, 300, 'bedroom')
        //create background and set the world bounds equal to the size of the background
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }
    createProtag() {
        // Protagonist
        this.protag = this.physics.add.sprite(500, 300, 'protag');

        //set's the protag's hit box
        this.protag.body.height = 30
        this.protag.body.width = 120
        this.protag.body.offset = {x: 30, y: 150};
        this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
    }
    createEmpress() {
        this.emp = new Empress({scene: this, x: 750, y: 340, key: 'empress'});
        this.emp.angle = 28;
        this.emp.body.immovable = true;
    }

    createItems() {
        this.items = [];
        this.items[0] = new Item({scene: this, x: 600, y:500 , texture: 'toy'});
        this.items[0].create(); //set name here
    }

    changeRooms() {
        // console.log(currScene)
        // async function func() {
        //     currScene.input.enabled = false;
        //     await currScene.physics.pause()
        // }
        //this is a hack to allow the room to load before trying to move the protag, which was happening in the wrong order and throwing an error.  I know it's an anti-pattern, but I tried just using async/await and it didn't seem to help, so...
        // func().then(setTimeout(() => {
        this.physics.shutdown();
        this.scene.start('room2')
        // }, 10))
        // .then(this.scene.start('room2'))

    }

    createRoomChangeZone() {
        // let currScene = this;
        this.room2Door = this.add.zone(350, 100, 200, 200).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.allowRotation = true;
        this.room2Door.body.isCircle = true;
        this.room2Door.body.immovable = true;

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)
    }

    create() {
        super.create()
        this.input.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });

        //create static groups
        this.background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup()
        this.cursors = this.input.keyboard.createCursorKeys();


        this.createBg();
        this.createProtag();
        // this.createItems();

        console.log(this.world)

        this.createRoomChangeZone()

        //create and instantiate characters/sprites
        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 350,
            y: 350
        })



        this.createEmpress();
        console.log(this.emp.body)

        // this.koto = new Item({
        //     scene: this,
        //     texture: 'koto',
        //     x: 500,
        //     y: 300,
        //     scaleX: .5,
        //     scaleY: .5
        // }).setInteractive()


       //Camera setup
       this.setCameras();

       //depth sorting
       if (this.protag.velocity !== 0) {
        this.akiko.depth = this.akiko.y + this.akiko.height / 2;
        }
    }

}
