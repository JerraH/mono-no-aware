//also please pass it a constructor object with a callback, an exitfunc property, a scene, and your options
import Phaser from 'phaser'

export default class HandleKeyVertical {
    constructor(config) {
        this.callback = config.callback;
        this.exitFunc = config.exitFunc;
        this.scene = config.scene
        this.options = config.options
        this.selectionIndex = 0;
        this.handleKey = this.handleKey.bind(this)
    }
    preload() {
        this.load.audio('select', 'assets/audio/select.m4a')
        this.load.audio('tap', 'assets/audio/tap.m4a')
    }
    handleKey(event) {
        if (event.repeat) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                if (this.selectionIndex > 0) {
                    this.sound.add('tap').play();
                    this.selectionIndex--;
                }
                break;
            case 'ArrowDown':
                if (this.selectionIndex < 1) {
                    this.sound.add('tap').play();
                    this.selectionIndex++;
                }
                break;
            case 'Enter':
                this.sound.add('select').play();
                this.input.keyboard.off('keydown', this.handleKey)
                if (this.selectionIndex === 0) {
                    this.callback();
                } else {
                    this.exitFunc();
                }
                break;
            default:
                break;
        }
    } //end handlekey
    create() {
        for (let i = 0; i < this.options.length; i++) {
            let option = this.add.text(0, 0, this.options[i], {font: "40px Amatic SC" });
            Phaser.Display.Align.In.Center(option, this.add.zone(400, 270 + i * 60, 0, 0));
        }

        this.selection = this.add.graphics(200, 54);
        this.selection.lineStyle(2, 0xfffff, 1);
        this.selection.strokeRect(0, 0, 200, 54);
        this.selection.x = 300;
        this.blink = 0;

        this.input.keyboard.on('keydown', this.handleKey)

    }
    update(time, delta) {
        this.selection.y = 243 + this.selectionIndex * 60;
        this.blink += delta;
        this.selection.alpha = [1,0.5][Math.floor(this.blink / 500) % 2]; //this is the fading in and out effect
   }
}
