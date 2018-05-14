//also please pass it a constructor object with a callback, an exitfunc property, a scene, and your options
import Phaser from 'phaser'
import store from './store'

const utilityFunctions = {
    handleKeyVertical: function (callback, exitFunc, options) {
        // console.log('the this inside my handlekeyvertical is', this)
        this.selectionIndex = 0;
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')

        //the key handling is actually being handled within the gameScene update method!

        //this creates an object for each of your options
        for (let i = 0; i < options.length; i++) {
            let option = this.add.text(0, 0, options[i], {
                font: "40px Amatic SC"
            });
            Phaser.Display.Align.In.Center(option, this.add.zone(400, 270 + i * 60, 0, 0));
            option.depth = 2000;
        }


        this.selection = this.add.graphics(200, 54);
        this.selection.lineStyle(2, 0xfffff, 1);
        this.selection.strokeRect(0, 0, 200, 54);
        this.selection.depth = 2000;
        this.selection.blink = 0;


        this.selection.y = 243;

    },
    setInterval: function(cb, ms) {
        let timer = {
            cb,
            ms: this.frameMS + ms,
            interval: ms
        }
        this.timers.push(timer)
        return timer;
    }
}

export default utilityFunctions


