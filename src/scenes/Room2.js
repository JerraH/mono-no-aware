import { default as GameScene } from './GameScene';
import Phaser from 'phaser';


export default class Room2 extends GameScene {


    preload() {
        this.load.image('protag', 'assets/images/protagforroom2.png');
        this.load.image('plainbg', 'assets/images/plainbgforroom2.png');
        this.load.image('background', 'assets/images/room2.png');
        this.load.image('screenDoors', 'assets/images/screendoors.png');
        this.load.image('slidingDoor', 'assets/images/slidingdoor.png');
        this.load.image('hangingScreen', 'assets/images/hangingscreen.png');
        this.load.image('smoke-top-level', 'assets/images/smoke-top-level.png');
        this.load.image('smoke4', 'assets/images/smoke4.png');
        this.load.image('smoke3', 'assets/images/smoke3.png');
    }
    create() {
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();

        this.plainbg = this.background.create(400, 275, 'plainbg')
        this.groundLayer = this.background.create(400, 275, 'background')
        console.log(this.groundLayer)
        // this.smoke1 = this.background.create(600, 200, 'smoke1')
        // this.smoke2 = this.background.create(600, 200, 'smoke2')
        this.smoke3 = this.smoke.create(75, 50, 'smoke3')
        this.smoke4 = this.smoke.create(75, 50, 'smoke4')
        this.slidingDoor = this.behinders.create(520, 100, 'slidingDoor')
        this.screenDoors = this.behinders.create(700, 100, 'screenDoors')
        //set screen door hit box
        this.screenDoors.body.height = 20
        this.screenDoors.body.y = 200
        //set sliding door hit box
        this.slidingDoor.body.height = 20
        this.slidingDoor.body.y = 200
        this.smokeTopLevel = this.smoke.create(600, 200, 'smoke-top-level')


        //declare cursors
        this.cursors = this.input.keyboard.createCursorKeys();


        //declare protag
        this.protag = this.physics.add.sprite(700, 500, 'protag');
        this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
        //set's the protag's hit box
        this.protag.body.height = 75
        this.protag.body.width = 170
        this.protag.body.offset = {x: 30, y: 225};

        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
        })

        //Camera setup
       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width + 50, this.groundLayer.height + 50)


    }

}
