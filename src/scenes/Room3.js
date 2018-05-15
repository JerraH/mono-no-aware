import {
    default as GameScene
} from './GameScene';
import Twins from '../characters/twins'



export default class Room3 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRooms = this.changeRooms.bind(this);
        this.timers = []
        this.roomId = 3;
    }

    preload() {
        super.preload();
        this.load.image('protag', 'assets/images/characters/protagforroom3.png');
        this.load.image('background3', 'assets/images/scenes/room3/background3.png');
        this.load.image('screen1', 'assets/images/scenes/room3/screen1.png');
        this.load.image('screen2', 'assets/images/scenes/room3/screen2.png');
        this.load.image('screen3', 'assets/images/scenes/room3/screen3.png');
        this.load.image('hangingScreen3', 'assets/images/scenes/room3/hangingScreenroom3.png');
        this.load.image('smoke1', 'assets/images/scenes/room3/smoke1.png')
        this.load.image('smoke2', 'assets/images/scenes/room3/smoke2.png')
        this.load.image('twins', 'assets/images/characters/twinsSmall.png ')

    }
    createObjects() {
        this.groundLayer = this.background.create(450, 300, 'background3')

        //smoke
        this.smoke1 = this.smoke.create(400, 200, 'smoke1')

        //things you can go behind


        this.screen1 = this.behinders.create(400, 50, 'screen1')
        this.screen2 = this.behinders.create(418, 195, 'screen2')
        this.hangingScreen = this.behinders.create(640, 380, 'hangingScreen3')
        this.screen3 = this.behinders.create(460, 300, 'screen3')





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
        this.createProtag(this.roomId)///this function has been moved to Gamescene

        this.twins = new Twins({
            scene: this,
            key: 'twins',
            x: 300,
            y: 300
        })

        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 100;
            child.body.y = child.y + (child.height / 2) - 40
        })
        this.screen1.body.checkCollision.none = true;
        this.screen3.body.y -= 80;
        this.screen2.body.y -= 140;
        this.screen2.body.height = 160
        this.hangingScreen.body.height = 40;


        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.room2Door = this.add.zone(1100, 0, 50, 650).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.immovable = true;

        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)



    }
    update() {
        super.update()
    }

}
