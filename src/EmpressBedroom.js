
import {GameScene} from './GameScene.js';

export default class EmpressBedroom extends GameScene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('akiko', 'assets/images/akiko.png')
    }
    create() {
        let NPCs = this.physics.add.staticGroup()

       let akiko = NPCs.create(600, 400, 'akiko')

    }

}
