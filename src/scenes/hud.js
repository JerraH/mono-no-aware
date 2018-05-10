import Phaser from 'phaser'
import store from '../store';

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
        this.timerWheel = this.add.sprite(10, -10, 'timerwheel')
        let timerHouse = this.add.image(10, 0, 'timerhouse')

        this.hudselector = this.add.graphics();
        this.hudselector.lineStyle(4, 0x4f3434, 1);
        this.hudselector.fillStyle(0xf3e3cb)

        this.hudselector.fillRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + (timerHouse.height / 2))
        this.hudselector.strokeRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + timerHouse.height / 2);

        this.timerContainer.add(this.timerWheel).setDepth(2000)
        this.timerContainer.add(timerHouse).setDepth(2000)
        this.text = this.add.text(0, 0);
        this.timerContainer.add(this.text).setDepth(2000)

        let onEvent = console.log("FUCK YEAH")
        this.tweens.add({
            targets: this.timerWheel,
            ease: 'Power1',
            duration: 86400000,
            repeat: 2,
            angle: 360
        });


    }

    update () {
        super.update();
        this.timeLeft = function() {
            const ms = this.timer.delay - this.timer.getOverallProgress();
            this.inDays = ms * 144;
            const secs = (this.inDays / 1000)

            // 1200000 === 172800000
            const totalMinutes = secs / 60;
            const min = totalMinutes % 60;
            const hours = Math.floor(totalMinutes / 60)

            const days = Math.floor(hours / 24)
            const finHours = hours % 24
            return days + " days and " + finHours + 'hours left'

        }




        setInterval(10000, () => {
            store.setTime(this.timeLeft())
            this.setText(store.getTime())
            console.log(store.getTime())
        })




        // let p1 = Phaser.Math.RotateAroundDistance({ x: this.x, y: this.y }, this.x, this.y, Phaser.Math.DegToRad(angle - 5));



}

}

