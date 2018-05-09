import {
    default as GameScene
} from './GameScene';
import Phaser from 'phaser';


export default class Room2 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRooms = this.changeRooms.bind(this);
    }

    preload() {
        super.preload();
        this.load.image('protag', 'assets/images/protagforroom2.png');
        this.load.image('plainbg', 'assets/images/plainbg.png');
        this.load.image('background', 'assets/images/room2.png');
        this.load.image('backwall', 'assets/images/backwall.png');
        this.load.image('column1', 'assets/images/column1.png');
        this.load.image('column2', 'assets/images/column2.png');
        this.load.image('screenDoors', 'assets/images/screendoors.png');
        this.load.image('slidingDoor', 'assets/images/slidingdoor.png');
        this.load.image('hangingScreen', 'assets/images/hangingscreen.png');
        this.load.image('backwall', 'assets/images/backwall.png')
        this.load.image('smoke-top-level', 'assets/images/smoke-top-level.png');
        this.load.image('smoke1', 'assets/images/smoke1.png');
        this.load.image('smoke2', 'assets/images/smoke2.png');
        this.load.image('smoke4', 'assets/images/smoke4.png');
        this.load.image('smoke3', 'assets/images/smoke3.png');
        this.load.image('smoke5', 'assets/images/smoke5.png');
    }
    createObjects() {
        this.plainbg = this.background.create(900, 120, 'plainbg')
        this.backwall = this.behinders.create(600, 150, 'backwall')
        this.groundLayer = this.background.create(600, 340, 'background')

        //smoke
        this.smoke1 = this.background.create(100, 200, 'smoke1')
        console.log(this.smoke1)
        this.smoke2 = this.background.create(440, 280, 'smoke2')
        console.log(this.smoke2)
        this.smoke3 = this.smoke.create(75, 50, 'smoke3')
        console.log(this.smoke3)
        this.smoke4 = this.smoke.create(190, 190, 'smoke4')
        this.smoke4 = this.smoke.create(170, 120, 'smoke5')

        console.log(this.backwall)
        //things you can go behind
        this.slidingDoor = this.behinders.create(700, 150, 'slidingDoor')
        this.screenDoors = this.behinders.create(920, 150, 'screenDoors')

        this.column1 = this.behinders.create(520, 150, 'column1')
        this.column2 = this.behinders.create(800, 100, 'column2')



        // this.column1.body.height = 40;
        // this.column1.body.y = 250;


        this.hangingScreen = this.behinders.create(600, 470, 'hangingScreen')
        this.smokeTopLevel = this.smoke.create(600, 350, 'smoke-top-level')

        //set world bounds

        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    changeRooms() {
        // async function func() {
        //     currScene.input.enabled = false;
        //     await currScene.physics.pause()
        // }
        // if (this.protag.velocity) {
        //     func().then(setTimeout(() => {
            this.physics.shutdown();
            this.scene.start('EmpressBedroom')
            // }, 10))
        // }
        // console.log(this.protag)
        //this is a hack to allow the room to load before trying to move the protag, which was happening in the wrong order and throwing an error.  I know it's an anti-pattern, but I tried just using async/await and it didn't seem to help, so...
    }

    create() {
        super.create();

        let currScene = this;
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();

        //creating background objects
        this.createObjects()

        //declare protag
        this.protag = this.physics.add.sprite(700, 500, 'protag');
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        //set's the protag's hit box
        this.protag.body.height = 40
        this.protag.body.width = 140
        this.protag.body.offset = {
            x: 30,
            y: 245
        };

        this.backwall.body.checkCollision.none = true;
        this.slidingDoor.depth = this.screenDoors.depth + 10
        this.backwall.depth = this.slidingDoor.depth + 10;
        this.column2.depth = this.screenDoors.depth - 20
        console.log("screendoors", this.screenDoors)
        console.log("slidingdoor")


        //add colliders
        this.behinders.children.iterate((child) => {
            if (this.key !== 'backwall') {
                this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height/2) - 40
            }
        })

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.room2Door = this.add.zone(1100, 0, 50, 650).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.immovable = true;
        // console.log(this.room2Door)
        // let checkMotion = () => {
        //     if (this.cursors.right.isDown) {
        //         return true
        //     } else {
        //         return false;
        //     }
        // }


        // .then(this.scene.start('room2'))

       //Camera setup
       this.setCameras();

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)
        // console.log(this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms))


    }

}
