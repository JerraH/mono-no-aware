import {
    default as GameScene
} from './GameScene';


export default class Room3 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRooms = this.changeRooms.bind(this);
        this.timers = []
    }

    preload() {
        super.preload();
        this.load.image('protag', 'assets/images/characters/protagforroom3.png');
        this.load.image('background', 'assets/images/scenes/room3/background.png');
        this.load.image('screen1', 'assets/images/scenes/room3/screen1.png');
        this.load.image('screen2', 'assets/images/scenes/room3/screen2.png');
        this.load.image('screen3', 'assets/images/scenes/room3/screen3.png');
        this.load.image('hangingScreen', 'assets/images/scenes/room3/hangingScreen.png');
        this.load.image('smoke1', 'assets/images/scenes/room3/smoke1')
        this.load.image('smoke2', 'assets/images/scenes/room3/smoke2')

    }
    createObjects() {
        this.groundLayer = this.background.create(600, 340, 'background')

        //smoke
        this.smoke1 = this.smoke.create(100, 200, 'smoke1')
        // console.log(this.smoke1)

        //things you can go behind
        this.screen2 = this.behinders.create(520, 250, 'screen2')

        this.screen1 = this.behinders.create(520, 300, 'screen1')
        this.screen3 = this.behinders.create(520, 200, 'screen3')



        // this.column1.body.height = 40;
        // this.column1.body.y = 250;


        this.hangingScreen = this.behinders.create(700, 470, 'hangingScreen')

        //set world bounds

        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    changeRooms() {
        this.physics.shutdown();
        this.scene.start('Room2')
    }

    create() {
        super.create();



        //creating background objects
        this.createObjects()

        //declare protag
        this.protag = this.physics.add.sprite(1000, 500, 'protag');
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        //set's the protag's hit box
        this.protag.body.height = 40
        this.protag.body.width = 140
        this.protag.body.offset = {
            x: 30,
            y: 245
        };



        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height / 2) - 40
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

        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)
        // console.log(this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms))


    }
    update() {
        super.update()
    }

}
