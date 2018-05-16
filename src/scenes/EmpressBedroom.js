import {
    default as GameScene
} from './GameScene.js';
import {
    default as Akiko
} from '../characters/akiko'
import Empress from '../characters/Emp'
import Phaser from 'phaser'

export default class EmpressBedroom extends GameScene {

    constructor(config) {
        super(config)
        this.changeRoom2 = this.changeRoom2.bind(this)
        this.changeRoom4 = this.changeRoom4.bind(this)
        this.roomId = 1;
    }

    preload() {
        super.preload();
    }

    createBg() {
        this.groundLayer = this.background.create(500, 300, 'bedroom')
        //create background and set the world bounds equal to the size of the background
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }

    createEmpress() {
        this.emp = new Empress({
            scene: this,
            x: 850,
            y: 370,
            key: 'empress'
        });
        // this.emp.angle = 28;
        // this.emp.body.angle = 28;
        // this.emp.body.immovable = true;
        // this.emp.body._bounds = null
        // console.log(this.emp)

    }

    changeRoom2() {
        this.physics.shutdown();
        this.scene.start('Room2')

    }

    changeRoom4() {
        this.physics.shutdown();
        this.scene.start('Room4')
    }

    createPolygon() {

        let polygon = new Phaser.Geom.Polygon([
            680, 355,
            750, 320,
            800, 400,
            900, 470,
        ]);
        // console.log(polygon)

        // var graphics = this.add.graphics();

        // graphics.lineStyle(2, 0x00aa00);

        // graphics.beginPath();

        // graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

        // for (var i = 1; i < polygon.points.length; i++) {
        //     graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        // }

        // graphics.closePath();
        // graphics.strokePath();

        return polygon
    }

    createRoomChangeZone() {
        // let currScene = this;
        this.room2Door = this.add.zone(350, 100, 200, 200).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.allowRotation = true;
        this.room2Door.body.isCircle = true;
        this.room2Door.body.immovable = true;

        this.room4Door = this.add.zone(900, 450, 200, 200).setName('room4Door').setInteractive();
        this.physics.world.enable(this.room4Door)
        this.room4Door.body.allowRotation = true;
        this.room4Door.body.isCircle = true;
        this.room4Door.body.immovable = true;

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRoom2)
        this.physics.add.overlap(this.protag, this.room4Door, this.changeRoom4)
    }

    create() {
        super.create()
        this.input.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });

        //create static groups
        this.background = this.physics.add.staticGroup();
        this.NPCs = this.physics.add.staticGroup()
        this.cursors = this.input.keyboard.createCursorKeys();

        this.createBg();

        this.createProtag(this.roomId)///this function has been moved to Gamescene

        //This function creates Scene Items and stores them in this.allItems,
        //which is then utilized by game scene when you press the enter key on any Item

        const sceneItems = this.createItems(this, [{
            id: 'sake',
            x: 600,
            y: 500
        }]);

        this.polygon = this.createPolygon()
        this.physics.world.enable(this.polygon)
        // console.log(this.polygon)

        this.createRoomChangeZone()


        //create and instantiate characters/sprites
        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 350,
            y: 350
        })


        this.createEmpress();

        // this.koto = new Item({
        //     scene: this,
        //     texture: 'koto',
        //     x: 500,
        //     y: 300,
        //     scaleX: .5,
        //     scaleY: .5
        // }).setInteractive()


        //Camera setup
        this.setCameras();

        this.physics.add.collider(this.emp, this.protag, this.emp.enterConvo)

        //depth sorting
        if (this.protag.velocity !== 0) {
            this.akiko.depth = this.akiko.y + this.akiko.height / 2;
        }
    }

}
