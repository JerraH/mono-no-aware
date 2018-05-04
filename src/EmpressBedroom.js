
import {default as GameScene} from './GameScene.js';
import { default as Akiko } from './characters/akiko'
import Protag from './characters/protag'

export default class EmpressBedroom extends GameScene {

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
        this.load.image('bedroom', 'assets/images/roomredo.jpg')
        this.load.image('protag', 'assets/images/protag.png')
    }
    create() {

        let background = this.physics.add.staticGroup();
        let NPCs = this.physics.add.staticGroup();
        this.bedroom = background.create(0, 0, 'bedroom')
        // let protag = new Protag({
        //     scene: this,
        //     key: 'protag',
        //     x: 100,
        //     y: 600
        // })

        this.akiko = new Akiko({
            scene: this,
            key: 'akiko',
            x: 300,
            y: 500,
            scale: .25
        })

        // this.NPCs.add(akiko);








       this.cursors = this.input.keyboard.createCursorKeys();
       this.protag = this.physics.add.sprite(200, 300, 'protag');
       this.physics.add.collider(this.protag, this.akiko);
    //    this.protag.setBounds(0, 0, this.bedroom.width * this.bedroom.scaleX, this.bedroom.height *this.bedroom.scaleY );
       this.cameras.main.startFollow(this.protag)



    }



}
