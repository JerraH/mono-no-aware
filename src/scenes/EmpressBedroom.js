import {
    default as GameScene
} from './GameScene.js';
import {
    default as Akiko
} from '../characters/akiko'
import Empress from '../characters/Emp'
import Item from '../Item'
import Phaser from 'phaser'

export default class EmpressBedroom extends GameScene {

    constructor(config) {
        super(config)
        this.changeRooms = this.changeRooms.bind(this)


    }

    preload() {
        //this.globalPreload.call(this); don't delete my beautiful function!
        super.preload();
        this.load.image('protag', 'assets/images/characters/protag.png')
        this.load.image('empress', 'assets/images/scenes/EmpressBedroom/Empress.png')
        this.load.image('akiko', 'assets/images/characters/akiko.png')
        this.load.image('bedroom', 'assets/images/scenes/EmpressBedroom/roomredo.jpg')
        this.load.image('walls', 'assets/images/scenes/EmpressBedroom/walls.png')
        this.load.image('toy', 'assets/catToy.png')
        this.load.image('triangle', 'assets/greenTriangle.png');
        this.load.image('sake', 'assets/images/item/Sake.png')
    }

    createBg() {
        this.groundLayer = this.background.create(500, 300, 'bedroom')
        //create background and set the world bounds equal to the size of the background
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
    }
    createProtag() {
        // Protagonist
        this.protag = this.physics.add.sprite(500, 300, 'protag');

        //set's the protag's hit box
        this.protag.body.height = 30
        this.protag.body.width = 120
        this.protag.body.offset = {
            x: 30,
            y: 150
        };
        this.protag.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
    }
    createEmpress() {
        this.emp = new Empress({
            scene: this,
            x: 850,
            y: 370,
            key: 'empress'
        });
        this.emp.angle = 28;
        this.emp.body.angle = 28;
        this.emp.body.immovable = true;
        this.emp.body._bounds = null
        console.log(this.emp)

    }

    changeRooms() {
        this.physics.shutdown();
        this.scene.start('room2')

    }
    createPolygon() {

        let polygon = new Phaser.Geom.Polygon([
            580, 155,
            650, 120,
            700, 200,
            800, 270,
        ]);
        console.log(polygon)

        var graphics = this.add.graphics({
            x: 100,
            y: 200
        });

        graphics.lineStyle(2, 0x00aa00);

        graphics.beginPath();

        graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

        for (var i = 1; i < polygon.points.length; i++) {
            graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        }

        graphics.closePath();
        graphics.strokePath();

        return polygon
    }

    createRoomChangeZone() {
        // let currScene = this;
        this.room2Door = this.add.zone(350, 100, 200, 200).setName('room2Door').setInteractive();
        this.physics.world.enable(this.room2Door)
        this.room2Door.body.allowRotation = true;
        this.room2Door.body.isCircle = true;
        this.room2Door.body.immovable = true;

        this.physics.add.overlap(this.protag, this.room2Door, this.changeRooms)
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

        this.createProtag();

        //Create Scene Items and store them in the allItems base,
        //which is utilized when you press the enter key

        const sceneItems = this.createItems(this, [{
            name: 'sake',
            x: 600,
            y: 500
        }]);

        sceneItems.forEach((sceneItem) => {
            this.gameItems.push(sceneItem);
        })

        this.polygon = this.createPolygon()
        this.physics.world.enable(this.polygon)
        console.log(this.polygon)

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

        this.physics.add.collider(this.polygon, this.protag, this.emp.enterConvo)

        //depth sorting
        if (this.protag.velocity !== 0) {
            this.akiko.depth = this.akiko.y + this.akiko.height / 2;
        }
    }

}
