//also please pass it a constructor object with a callback, an exitfunc property, a scene, and your options
import Phaser from 'phaser'
import store from './store'

const utilityFunctions = {
    parseVariableName: function (variable) {
        let split = variable.split('.');
        return {
            character: (split.length === 1) ? 'protag' : split[0],
            variable: split[split.length - 1]
        }
    },
    testExpression: function (expr, value) {
        let split = expr.split(' ');
        const OPERATOR_FN = {
            '<': (a, b) => a < b,
            '<=': (a, b) => a <= b,
            '=': (a, b) => a === b,
            '>=': (a, b) => a >= b,
            '>': (a, b) => a > b
        }
        if (split.length === 2) { // < 10
            return OPERATOR_FN[split[0]](value, parseInt(split[1]));
        } else if (split[0] === 'x') { // x < 10
            return OPERATOR_FN[split[1]](value, parseInt(split[2]));
        } else if (split[2] === 'x') { // 5 < x < 10
            return OPERATOR_FN[split[1]](parseInt(split[0]), value) &&
                OPERATOR_FN[split[3]](value, parseInt(split[4]));
        }
    },
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


