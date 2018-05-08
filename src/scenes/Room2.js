import {
    default as GameScene
} from './GameScene';
import Phaser from 'phaser';


export default class Room2 extends GameScene {


    preload() {
        this.load.image('protag', 'assets/images/protagforroom2.png');
        this.load.image('plainbg', 'assets/images/plainbg.png');
        this.load.image('background', 'assets/images/room2.png');
        this.load.image('backwall', 'assets/images/backwall.png');
        this.load.image('column1', 'assets/images/column1.png');
        this.load.image('column2', 'assets/images/column2.png');
        this.load.image('screenDoors', 'assets/images/screendoors.png');
        this.load.image('slidingDoor', 'assets/images/slidingdoor.png');
        this.load.image('hangingScreen', 'assets/images/hangingscreen.png');
        this.load.image('smoke-top-level', 'assets/images/smoke-top-level.png');
        this.load.image('smoke1', 'assets/images/smoke1.png');
        this.load.image('smoke2', 'assets/images/smoke2.png');
        this.load.image('smoke4', 'assets/images/smoke4.png');
        this.load.image('smoke3', 'assets/images/smoke3.png');
        this.load.image('smoke5', 'assets/images/smoke5.png');
    }
    create() {
        let currScene = this;
        //create static groups
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();

        this.plainbg = this.background.create(900, 120, 'plainbg')
        this.groundLayer = this.background.create(600, 340, 'background')

        this.smoke1 = this.background.create(100, 200, 'smoke1')
        console.log(this.smoke1)
        this.smoke2 = this.background.create(440, 280, 'smoke2')
        console.log(this.smoke2)

        this.smoke3 = this.smoke.create(75, 50, 'smoke3')
        console.log(this.smoke3)
        this.smoke4 = this.smoke.create(190, 190, 'smoke4')
        this.smoke4 = this.smoke.create(170, 120, 'smoke5')
        this.slidingDoor = this.behinders.create(700, 150, 'slidingDoor')
        this.screenDoors = this.behinders.create(920, 140, 'screenDoors')
        this.column1 = this.behinders.create(520, 150, 'column1')
        this.column2 = this.background.create(800, 100, 'column2')
        this.hangingScreen = this.behinders.create(600, 470, 'hangingScreen')
        this.hangingScreen.body.height = 60;
        this.hangingScreen.body.y = 630
        //set screen door hit box
        this.screenDoors.body.height = 20
        this.screenDoors.body.y = 230
        //set sliding door hit box
        this.slidingDoor.body.height = 20
        this.slidingDoor.body.offset = {x: 0, y: 220}
        this.smokeTopLevel = this.smoke.create(600, 350, 'smoke-top-level')


        //declare cursors
        this.cursors = this.input.keyboard.createCursorKeys();


        //declare protag
        this.protag = this.physics.add.sprite(700, 500, 'protag');
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        //set's the protag's hit box
        this.protag.body.height = 75
        this.protag.body.width = 170
        this.protag.body.offset = {
            x: 30,
            y: 245
        };

        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
        })

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.room2Door = this.add.zone(1200, 0, 50, 650).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.immovable = true;
        console.log(this.room2Door)
        this.changeRooms = () => {
            async function func() {
                currScene.input.enabled = false;
                await currScene.physics.pause()
            }
            if (this.cursors.right.isDown) {
                func().then(setTimeout(() => {
                    this.scene.start('EmpressBedroom')
                }, 10))
            }
            console.log(this.protag)
            //this is a hack to allow the room to load before trying to move the protag, which was happening in the wrong order and throwing an error.  I know it's an anti-pattern, but I tried just using async/await and it didn't seem to help, so...

        }
        let checkMotion = () => {
            if (this.cursors.right.isDown) {
                return true
            } else {
                return false;
            }
        }


        // .then(this.scene.start('room2'))


        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms, checkMotion, this.cursors.right.isDown)
        console.log(this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms))


    }

}
