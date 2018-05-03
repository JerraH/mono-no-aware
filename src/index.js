import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
    this.load.image('cat', 'assets/blackCat.png');
    this.load.image('toy', 'assets/catToy.png');
}

let cursors;
let cat;

function create ()
{
    // var logo = this.add.image(400, 150, 'logo');
    cat = this.physics.add.sprite(400, 300, 'cat')

    let toys = this.physics.add.staticGroup();
    let furryToy = toys.create(600, 400, 'toy')

    cat.setCollideWorldBounds(true);
    this.physics.add.collider(cat, toys);

    cursors = this.input.keyboard.createCursorKeys();

    // this.tweens.add({
    //     targets: logo,
    //     y: 450,
    //     duration: 2000,
    //     ease: 'Power2',
    //     yoyo: true,
    //     loop: -1
    // });

}

function update() {
    if (cursors.left.isDown) {
        cat.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        cat.setVelocityX(160);
    }
    else if(cursors.up.isDown) {
        cat.setVelocityY(-160);
    }
    else if(cursors.down.isDown) {
        cat.setVelocityY(160);
    }
    else {
        cat.setVelocityX(0);
        cat.setVelocityY(0);
    }
}

