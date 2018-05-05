class Store {
    constructor() {
        this.pronoun = '';
        this.beloved = '';
        this.dialogue = null;
    }

    // The player's chosen pronoun

    setPronoun(pronoun) {
        this.pronoun = pronoun;
    }

    getPronoun() {
        return this.pronoun;
    }

    // The player's chosen beloved

    setBeloved(beloved) {
        this.beloved = beloved;
    }

    getBeloved() {
        return this.beloved;
    }
    /**
     * Character methods
     */

    // The dialogue for the current scene

    setDialogue(dialogue) {
        this.dialogue = dialogue;
    }

    getDialogue() {
        return this.dialogue;
    }
}


let store = new Store();

export default store;
