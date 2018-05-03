import Phaser from 'phaser';
import TitleScene from './TitleScene';
import PronounScene from './PronounScene';
import BelovedScene from './BelovedScene';
import GameScene from './GameScene';
import EndingScene from './EndingScene';
import EmpressBedroom from './EmpressBedroom'
import store from './store';

let config = {
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
game.scene.add('title', TitleScene);
game.scene.add('pronoun', PronounScene);
game.scene.add('beloved', BelovedScene);
game.scene.add('game', GameScene);
game.scene.add('EmpressBedroom', EmpressBedroom);
game.scene.add('ending', EndingScene);
game.scene.start('title');
