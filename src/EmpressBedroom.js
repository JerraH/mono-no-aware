
import {default as GameScene} from './GameScene.js';
import { default as Akiko } from './characters/akiko'
import Protag from './characters/protag'
import {default as Phaser, Collider, Key} from 'phaser';

export default class EmpressBedroom extends GameScene {

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('protag', 'assets/images/protag.png')
        this.load.image('empress', 'assets/images/emp.png')
    }
    create() {

        let background = this.physics.add.staticGroup();
        let NPCs = this.physics.add.staticGroup();
        this.groundLayer = background.create(500, 300, 'bedroom')

        // let protag = new Protag({
        //     scene: this,
        //     key: 'protag',
        //     x: 100,
        //     y: 600
        // })
        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height

        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 200,
            y: 300,
            scale: .25
        })
        let myx = new Phaser.Input.Keyboard.Key(88)

        this.input.keyboard.once('keydown', (event) => {
            if(event.value === myx){
                console.log("screaming")}

        });

        // this.NPCs.add(akiko);








       this.cursors = this.input.keyboard.createCursorKeys();
       this.protag = this.physics.add.sprite(400, 300, 'protag');
       this.protag.setVelocity(0,0).setBounce(0, 0).setCollideWorldBounds(true);
      //  this.emp = this.physics.add.sprite(500, 400, 'empress')

    //    this.protag.setBounds(0, 0, this.groundLayer.width * this.groundLayer.scaleX, this.groundLayer.height *this.groundLayer.scaleY );

       this.cameras.main.startFollow(this.protag)
       this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)

       console.log(this.akiko)

       this.physics.add.collider(this.protag, this.akiko);




    }
    update() {
      console.log("fuckkk")
    }

    // update() {
    //     if (this.akiko.collides) {
    //         console.log("WE COLLIDED")
    //     }
    // }



}
