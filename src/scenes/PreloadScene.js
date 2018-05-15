import { Scene } from 'phaser';
import FontFaceObserver from 'fontfaceobserver';

export default class PreloadScene extends Scene {
    preload() {
        let fonts = [
            // Must update these fonts in style.css
            'Berkshire Swash',
            'Amatic SC',
            'Kaushan Script',
            'Cabin'
        ];
        Promise.all(
                fonts.map(font => new FontFaceObserver(font).load())
            )
            .then(() => {
                this.complete = true;
            });

    }

    update() {
        if (this.complete) {
            // console.log(this)
            // store.setDialogue(new Dialogue('Title', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet urna nec augue facilisis ultrices nec id urna. Mauris tincidunt sapien id arcu volutpat, nec varius leo tempor. Quisque dolor justo, porta ut sagittis in, tincidunt sed metus. Morbi tristique felis et diam tempus, id eleifend tortor tempus.'));
            // this.scene.start('dialogue');

            this.scene.start('Room2');
        }
    }
}
