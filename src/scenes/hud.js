import Phaser from 'phaser'
import store from '../store';
import utilityFunctions from '../utilityFunctions'

let width = 800
let height = 600
let setTimer = function () {
    this.text.setText(this.timeLeft())
}
export default class HUD extends Phaser.Scene {
    constructor(config) {
        super(config)
        this.timers = []
        this.setTimer = setTimer.bind(this)



    }

    preload() {
        this.load.image('timerwheel', 'assets/images/hud/skytimer.png')
        this.load.image('timerhouse', 'assets/images/hud/timerhouse.png')


    }
    triggerEndGame() {
        return;
    }
    create() {
        //make the container and add the graphics
        this.timerContainer = this.add.container(730, 100)
        console.log(this.timerContainer)

        //load the sprites
        this.timerWheel = this.add.sprite(10, -10, 'timerwheel')
        let timerHouse = this.add.image(10, 0, 'timerhouse')

        //make the hud border
        this.hudselector = this.add.graphics();
        this.hudselector.lineStyle(4, 0x4f3434, 1);
        this.hudselector.fillStyle(0xf3e3cb)
        this.hudselector.fillRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + (timerHouse.height / 2))
        this.hudselector.strokeRect(this.timerContainer.x + 10 - timerHouse.width / 2, this.timerContainer.y - timerHouse.height - 15, timerHouse.width, this.timerContainer.y + timerHouse.height / 2);

        //add timer
        this.timer = this.time.delayedCall(1200000, this.triggerEndGame, [], this)
        this.timer.ignoreDestroy = true;


        //add everything to the container
        this.timerContainer.add(this.timerWheel).setDepth(2000)
        this.timerContainer.ignoreDestroy = true;
        this.timerWheel.ignoreDestroy = true;
        this.timerContainer.add(timerHouse).setDepth(2000)
        this.text = this.add.text(-40, -90, '2 days 0 hours', {
            font: "16px Kaushan Script",
            color: 0xffffff
        });
        this.timerContainer.add(this.text).setDepth(3010)


        this.tweens.add({
            targets: this.timerWheel,
            ease: 'Power1',
            duration: 600000,
            repeat: 2,
            angle: 360
        });

        console.log(this.timerWheel)








    }
    timeLeft() {

        let ms = this.timer.delay - this.timer.getOverallProgress();
        this.inDays = ms * 144;
        let secs = (this.inDays / 1000)
        // 1200000 === 172800000
        let totalMinutes = secs / 60;
        let min = totalMinutes % 60;
        let hours = Math.floor(totalMinutes / 60)

        this.days = Math.floor(hours / 24)
        this.finhours = hours % 24
        return this.days + " days " + this.finhours + " hours"
    }



    update() {
        // let setCountdown = () => {this.text.setText(this.timeLeft())
        // }
        this.time.addEvent({
            delay: 10000,
            callback: this.setTimer(),
            callbackScope: this,
            loop: true
        });
    }


}
