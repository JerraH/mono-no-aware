import 'phaser';

export const sceneConfig = {
    create: create,
    files: [
        {type: 'image', key: 'akiko', url: 'assets/images/akiko.png'}
    ]
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: sceneConfig
}

var


function create() {
    var Character = new Phaser.class({
        Extends: Phaser.GameObjects.Image,

        initialize:

        function Character(scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)
            this.setPosition(x, y);
            this.setScale(.5)
        }
    });

    this.children.add(new Character(this, 200, 200))
}

let akiko = this.physics.add.image(400, 300, 'akiko')


