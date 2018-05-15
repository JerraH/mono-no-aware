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
        this.load.image('protag', 'assets/images/characters/protagforroom2.png');
        this.load.image('backwall2', 'assets/images/scenes/room2/backwall.png');
        this.load.image('background', 'assets/images/scenes/room2/floorboards.png');
        this.load.image('column1', 'assets/images/scenes/room2/column1.png');

        this.load.image('screenDoors', 'assets/images/scenes/room2/screendoors.png');
        this.load.image('slidingDoor', 'assets/images/scenes/room2/slidingdoor.png');
        this.load.image('column2', 'assets/images/scenes/room2/column2.png');
        this.load.image('hangingScreen', 'assets/images/scenes/room2/hangingscreenroom2.png');
        this.load.image('smoke-top-level', 'assets/images/scenes/room2/smoke-top-level.png');
        this.load.image('smoke1', 'assets/images/scenes/room2/smoke1.png');
        this.load.image('smoke2', 'assets/images/scenes/room2/smoke2.png');
        this.load.image('smoke4', 'assets/images/scenes/room2/smoke4.png');
        this.load.image('smoke3', 'assets/images/scenes/room2/smoke3.png');
        this.load.image('smoke5', 'assets/images/scenes/room2/smoke5.png');
        this.load.image('sidetable2', 'assets/images/scenes/room2/sidetable2.png')
    }
    createObjects() {
        this.background = this.physics.add.staticGroup();
        this.behinders = this.physics.add.staticGroup();
        this.smoke = this.physics.add.group();
        this.object = this.physics.add.staticGroup();

        this.roomContainer = this.add.container(540, 320)


        this.groundLayer = this.background.create(0, 0, 'background')
        this.roomContainer.add(this.groundLayer)
        // this.groundLayer.x = this.groundLayer.width / 2
        // this.groundLayer.y = this.groundLayer.height / 2

        this.sidetable = this.object.create(50, 350, 'sidetable2')


        // smoke
        this.smoke1 = this.background.create(0, 300, 'smoke1')
        this.smoke2 = this.background.create(-110, 0, 'smoke2')
        this.smoke3 = this.smoke.create(75, 50, 'smoke3')
        this.smoke4 = this.smoke.create(190, 190, 'smoke4')
        this.smoke5 = this.smoke.create(170, 120, 'smoke5')
        // console.log("smoke1", this.smoke1)
        // console.log("smoke2", this.smoke2)
        console.log("smoke3", this.smoke3)
        console.log("smoke4", this.smoke4)
        console.log("smoke5", this.smoke5)
        this.roomContainer.add(this.smoke2)

        //things you can go behind


        this.backwall = this.behinders.create(560, 138, 'backwall2')
        this.backwall.body.width = 80
        this.backwall.depth = 100;
        this.slidingDoor = this.behinders.create(620, 132, 'slidingDoor')
        this.screenDoors = this.behinders.create(860, 135, 'screenDoors')
        console.log(this.column2)
        console.log(this.screenDoors)
        console.log("this.backwall", this.backwall)
        this.column2 = this.behinders.create(900, 135, 'column2')


        // console.log("this.backwall", this.backwall)
        // console.log("this.slidingDoors", this.slidingDoor)
        // console.log("this.screenDoors", this.screenDoors)


        // this.column1 = this.behinders.create(470, 138, 'column1')


        this.column2.setDepth(this.screenDoors.depth + 1)






        this.hangingScreen = this.behinders.create(600, 410, 'hangingScreen')
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
        this.column2.depth += 20

        // this.column2.depth = this.screenDoors.depth + 20

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.empressRoomDoor = this.add.zone(1000, 0, 50, 650).setName('empressRoomDoor').setInteractive();
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
