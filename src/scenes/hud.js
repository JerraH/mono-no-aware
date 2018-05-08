import Phaser from 'phaser'

let width = 800
let height = 600

export default class HUD extends Phaser.Scene {
    constructor(config) {
        super(config)

    }
    preload() {
        this.load.image('timerwheel', 'assets/images/skytimer.png')
        this.load.image('timerhouse', 'assets/images/timerhouse')

    }
    create() {
        this.timerZone = this.add.zone(700, 50)
        this.timerZone.add(0,0, 'timerwheel');
        this.timerZone.add(0,0, 'timerhouse')
    }

}

