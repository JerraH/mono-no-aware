

export default class TextBox extends Phaser.Geom.Rectangle {
    constructor(config) {
        super(config)

    }

}
let textContainer = this.add.container(this.world.width / 2, this.world.height / 2)

var graphics = this.add.graphics();

graphics.lineStyle(2, 0x00ffff, 1);
graphics.strokeRectangle(textContainer.x, textContainer.y, textContainer.input.circle.radius);
