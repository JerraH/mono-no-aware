import {
    default as GameScene
} from './GameScene';


export default class Room4 extends GameScene {
    constructor(config) {
        super(config);
        this.changeRoom1 = this.changeRoom1.bind(this);
        this.changeRoom3 = this.changeRoom3.bind(this);
        this.timers = []
        this.roomId = 4;
    }

    preload() {
        super.preload();
    }
    createObjects() {
        this.groundLayer = this.background.create(600, 340, 'background4')
        this.bookshelf = this.behinders.create(275, 290, 'bookshelf')
        this.bookshelf.body.height = 563;
        this.bookshelf.body.width = 209;
        //I think that the original behinders code might be stopping me from doing this
        //Will check this tomorrow
        this.bookshelf.body.offset = {x: 0, y: 0}

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

    changeRoom3() {
        this.physics.shutdown();
        this.scene.start('Room3')
    }

    changeRoom1() {
        this.physics.shutdown();
        this.scene.start('EmpressBedroom')
    }

    create() {
        super.create();



        //creating background objects
        this.createObjects()

        this.createProtag(this.roomId, {image: 'protagRoom3'})///this function has been moved to Gamescene



        //add colliders
        this.behinders.children.iterate((child) => {
            this.physics.add.collider(this.protag, child)
            child.body.height = 40;
            child.body.y = child.y + (child.height / 2) - 40
        })

        //Camera setup
        this.cameras.main.startFollow(this.protag)
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

        this.door4to3 = this.add.zone(1150, 0, 50, 650).setName('door4to3').setInteractive();
        this.physics.world.enable(this.door4to3)
        this.door4to3.body.immovable = true;

        this.door4to1 = this.add.zone(0, 220, 50, 650).setName('door4to1').setInteractive();
        this.physics.world.enable(this.door4to1)
        this.door4to1.body.immovable = true;

        //Camera setup
        this.setCameras();

        this.physics.add.overlap(this.protag, this.door4to3, this.changeRoom3)
        this.physics.add.overlap(this.protag, this.door4to1, this.changeRoom1)


    }
    // update() {
    //     super.update()
    // }

}
