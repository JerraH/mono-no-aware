import {
    default as GameScene
} from './GameScene';


export default class Room3 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRooms = this.changeRooms.bind(this);
        this.timers = []
        this.roomId = 4;
    }

    preload() {
        super.preload();
        this.load.image('protag', 'assets/images/characters/protagforroom3.png');
        this.load.image('background', 'assets/images/scenes/room4/backgroundforroom4.png');
        this.load.image('bed', 'assets/images/scenes/room4/bed.png');
        this.load.image('bookshelf', 'assets/images/scenes/room4/bookshelf.png');
        this.load.image('GoBoard', 'assets/images/scenes/room4/GoBoard.png');
        this.load.image('smoke1', 'assets/images/scenes/room4/smoke1.png');
        this.load.image('smoke2', 'assets/images/scenes/room4/smoke2')
        this.load.image('smoke3', 'assets/images/scenes/room4/smoke3')
        this.load.image('smoke4', 'assets/images/scenes/room4/smoke4')
        this.load.image('smoke5', 'assets/images/scenes/room4/smoke5')
        this.load.image('wall-and-screen', 'assets/images/scenes/room4/wall-and-screen')

    }
    createObjects() {
        this.groundLayer = this.background.create(600, 340, 'background')

        //smoke

        this.smoke.create(0, 0, 'smoke1')
        this.smoke.create(0, 0, 'smoke2')
        this.smoke.create(0, 0, 'smoke3')
        this.smoke.create(0, 0, 'smoke4')
        this.smoke.create(0, 0, 'smoke5')


        //set world bounds

        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    changeRooms() {
        this.physics.shutdown();
        this.scene.start('Room3')
    }

    create() {
        super.create();



        //creating background objects
        this.createObjects()

        this.createProtag(this.roomId)///this function has been moved to Gamescene



        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height / 2) - 40
        })

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.door1 = this.add.zone(1100, 0, 50, 650).setName('door1').setInteractive();
        this.physics.world.enable(this.door1)
        this.door1.body.immovable = true;

        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.door1, this.changeRooms)
        // console.log(this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms))


    }
    update() {
        super.update()
    }

}
