import Character from './character'
import Dialogue from '../Dialogue'
import store from '../store'

export default class Emp extends Character {
  constructor(config) {
      super(config)
      this.scene = config.scene;
      let pronouns = store.getBeloved()
      if (pronouns === 'she') {
          this.pronoun1 = 'she'
          this.pronoun2 = 'her'
          this.pronoun3 = 'hers'
          this.name = 'Empress'
      } else if (pronouns === 'he') {
          this.pronoun1 = 'he'
          this.pronoun2 = 'him'
          this.pronoun3 = 'his'
          this.name = 'Emperor'
      } else if (pronouns === 'the') {
        this.pronoun1 = 'they'
        this.pronoun2 = 'them'
        this.pronoun3 = 'theirs'
        this.name = 'Eminence'
      } else {
          this.pronoun1 = 'she'
          this.pronoun2 = 'her'
          this.pronoun3 = 'hers'
          this.name = 'Empress'
      }
      this.dialogue = new Dialogue('Attendant', 'The ' + this.name + ' is asleep.  Would you like to try to cure ' + this.pronoun2 + "?");
      this.dialogue.addResponse('I\'m ready!',
          this.saveEmpress());
      this.dialogue.addResponse("I need more time.", () => {
          // do something
      });
    }
    saveEmpress() {
        let inventory = store.getInventory();
        if (inventory.includes(store.cure1 && store.cure2)) {
            let dialogue = new Dialogue("Attendant", "You cured " + this.pronoun2 + "!")
            .addResponse("Yay!")
            store.setDialogue(dialogue)
        } else if (inventory.includes(store.cure1 || store.cure2)) {
            let dialogue = store.setDialogue(new Dialogue("Attendant", "Oh no!  Whatever you did didn't seem to work....."))
            store.setDialogue(dialogue)
        } else {console.log("the empress is asleep")}
    }

    create() {
        this.emp = this.scene.physics.add.image(750, 340, 'empress');
        this.emp.angle = 28;
        this.emp.body.immovable = true;
        // this.scene.scene.launch('dialogue');

    }


  }


