import Phaser from 'phaser'

let width = 800
let height = 600

export default class HUD extends Phaser.Scene {
    constructor(config) {
        super(config)

    }
    preload() {
        this.load.image('timerwheel', 'assets/images/skytimer.png')
        this.load.image('timerhouse', 'assets/images/timerhouse.png')

    }
    create() {
        this.timerContainer = this.add.container(730, 100)
        console.log(this.timerContainer)
        this.timerWheel = this.add.sprite(10, -10, 'timerwheel')
        let timerHouse = this.add.image(10, 0, 'timerhouse')

        this.hudselector = this.add.graphics();
        this.hudselector.lineStyle(4, 0x4f3434, 1);
        this.hudselector.fillStyle(0xf3e3cb)

        this.hudselector.fillRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + (timerHouse.height / 2))
        this.hudselector.strokeRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + timerHouse.height / 2);

        this.timerContainer.add(this.timerWheel).setDepth(2000)
        this.timerContainer.add(timerHouse).setDepth(2000)
        this.text = this.add.text(-timerHouse.width / 2, -timerHouse.height / 2);
        this.timerContainer.add(this.text).setDepth(2000)

        let onEvent = console.log("FUCK YEAH")



        this.timer = this.time.addEvent({delay: 1200000, callback: onEvent, callbackScope: this});



    }
    update () {
        this.timerContainer.scene.text.setText('You have ' + this.timer.getProgress().toString().substr(0, 4) + ' days left');

        setInterval(1000, () => {
            let angle = (360 / 600000) * this.timer.getOverallProgress();
            this.timerWheel.angle = angle

        })




        // let p1 = Phaser.Math.RotateAroundDistance({ x: this.x, y: this.y }, this.x, this.y, Phaser.Math.DegToRad(angle - 5));



}

}

