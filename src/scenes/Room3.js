import {
    default as GameScene
} from './GameScene';
import Twins from '../characters/twins'



export default class Room3 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRoom2 = this.changeRoom2.bind(this);
        this.changeRoom4 = this.changeRoom4.bind(this);
        this.timers = []
        this.roomId = 3;
    }

    preload() {
        super.preload();
    }
    createObjects() {
        this.groundLayer = this.background.create(300, 340, 'background3')

        //smoke
        this.smoke1 = this.smoke.create(100, 200, 'smoke6')

        //things you can go behind
        this.screen2 = this.behinders.create(520, 250, 'screen2')

        this.screen1 = this.behinders.create(520, 300, 'screen1')
        this.screen3 = this.behinders.create(520, 200, 'screen3')



        this.hangingScreen = this.behinders.create(700, 470, 'hangingScreen3')

        //set world bounds

        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    changeRoom2() {
        this.physics.shutdown();
        this.scene.start('Room2')
    }

    changeRoom4() {
        this.physics.shutdown();
        this.scene.start('Room4')
    }

    create() {
        super.create();

        //creating background objects
        this.createObjects()

        //declare protag
        this.createProtag(this.roomId, {image: 'protagRoom3'})///this function has been moved to Gamescene

        this.twins = new Twins({
            scene: this,
            key: 'twins',
            x: 100,
            y: 300
        })    

        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height / 2) - 40
        })

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.room2Door = this.add.zone(800, 0, 50, 800).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.immovable = true;

        this.room4Door = this.add.zone(0, 390, 100, 250).setName('room4Door').setInteractive();
        this.physics.world.enable(this.room4Door)
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

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRoom2)
        this.physics.add.overlap(this.protag, this.room4Door, this.changeRoom4)
        // console.log(this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms))


    }
    update() {
        super.update()
    }

}
