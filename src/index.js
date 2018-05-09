import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';
import PlayAgainScene from './scenes/PlayAgainScene';
import PronounScene from './scenes/PronounScene';
import BelovedScene from './scenes/BelovedScene';
import GameScene from './scenes/GameScene';
import EndingScene from './scenes/EndingScene';
import EmpressBedroom from './scenes/EmpressBedroom'
import DialogueScene from './scenes/DialogueScene'
import Garden from './scenes/Garden'
import store from './store';
import Room2 from './scenes/Room2';
import InventoryScene from './scenes/InventoryScene';
import InteractionScene from './scenes/InteractionScene';
import HUD from './scenes/hud';

let config = {
    type: Phaser.AUTO,
    parent: 'mono-no-aware',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

export let game = new Phaser.Game(config);
game.scene.add('preload', PreloadScene);
game.scene.add('title', TitleScene);
game.scene.add('playagain', PlayAgainScene);
game.scene.add('pronoun', PronounScene);
game.scene.add('beloved', BelovedScene);
game.scene.add('game', GameScene);
game.scene.add('EmpressBedroom', EmpressBedroom);
game.scene.add('room2', Room2)
game.scene.add('dialogue', DialogueScene);
game.scene.add('inventory', InventoryScene);
game.scene.add('interaction', InteractionScene)
game.scene.add('ending', EndingScene);
game.scene.add('garden', Garden)
game.scene.add('HUD', HUD)
game.scene.start('preload');



