import {Scene} from 'phaser';
import FontFaceObserver from 'fontfaceobserver';

export default class PreloadScene extends Scene {
    preload() {
        let fonts = ['Berkshire Swash'];
        Promise.all(
            fonts.map(font => new FontFaceObserver(font).load())
        )
        .then(() => {
            this.complete = true;
        });
    }

    update() {
        if (this.complete) {
            this.scene.start('title');
        }
    }
}