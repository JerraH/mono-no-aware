import Phaser from 'phaser';
import TitleScene from './TitleScene';
import GameScene from './GameScene';
import EndingScene from './EndingScene';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

let game = new Phaser.Game(config);
game.scene.add('title', new TitleScene());
game.scene.add('game', new GameScene());
game.scene.add('ending', new EndingScene());
game.scene.start('game');