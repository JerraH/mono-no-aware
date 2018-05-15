import {
    default as GameScene
} from './GameScene';


export default class Room2 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRoomsEmp = this.changeRoomsEmp.bind(this);
        this.changeRooms3 = this.changeRooms3.bind(this);
        this.createObjects = this.createObjects.bind(this)
        this.roomId = 2;

    }

    preload() {
        super.preload();
    }
    createObjects() {
             this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();


        this.groundLayer = this.background.create(600, 340, 'background2')

        //smoke
        // this.smoke1 = this.background.create(100, 200, 'smoke1')
        // // console.log(this.smoke1)
        // this.smoke2 = this.background.create(440, 280, 'smoke2')
        // // console.log(this.smoke2)
        // this.smoke3 = this.smoke.create(75, 50, 'smoke3')
        // // console.log(this.smoke3)
        // this.smoke4 = this.smoke.create(190, 190, 'smoke4')
        // this.smoke5 = this.smoke.create(170, 120, 'smoke5')

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

    changeRoomsEmp() {
        let checkMotion = () => {
            if (this.cursors.right.isDown) {
                return true
            } else {
                return false;
            }
        }
        if (checkMotion()) {
            this.physics.shutdown();
            this.scene.start('EmpressBedroom')
        }
    }
    changeRooms3() {
        let checkMotion = () => {
            if (this.cursors.left.isDown) {
                return true
            } else {
                return false;
            }
        }
        if (checkMotion()) {
            this.physics.shutdown();
            this.scene.start('Room3')
        }
    }

    create() {
        super.create();

        //create static groups


        //creating background objects
        this.createObjects()

        this.createProtag(this.roomId)///this function has been moved to Gamescene

        // this.slidingDoor.depth = this.screenDoors.depth + 10
        // this.column2.depth = this.screenDoors.depth - 20
        // console.log("screendoors", this.screenDoors)
        // console.log("slidingdoor")


        //add colliders
        this.behinders.children.iterate((child) => {
                this.physics.add.collider(this.protag, child)
                child.body.height = 40;
                child.body.y = child.y + (child.height / 2) - 40
        })

        this.column2.depth = this.screenDoors.depth + 20

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.empressRoomDoor = this.add.zone(1100, 0, 50, 650).setName('empressRoomDoor').setInteractive();
        this.physics.world.enable(this.empressRoomDoor)
        this.empressRoomDoor.body.immovable = true;

        this.room3Door = this.add.zone(150, 50, 300, 100).setName('room3Door').setInteractive();
        this.physics.world.enable(this.room3Door)
        this.room3Door.body.immovable = true;


        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.empressRoomDoor, this.changeRoomsEmp)
        this.physics.add.overlap(this.protag, this.room3Door, this.changeRooms3)
        // console.log(this.physics.add.overlap(this.protag, this.empressRoomDoor, this.changeRooms))


    }

}
