class Store {
    constructor() {
        this.pronoun = '';
        this.beloved = '';
        this.dialogue = null;//{title: "Hello my Baby", text: "HELLO MY BABY, HELLO MY HONEY, HELLO MY RAGTIME GAL / SEND ME A KISS BY WIRE / BABY MY HEART'S ON FIRE / IF YOU REFUSE ME, HONEY YOU LOSE ME, THEN YOU'LL BE LEFT ALONE SO BABY TELEPHONE AND TELL ME I'M YOUR OWN"};
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

    // The dialogue for the current scene

    setDialogue(dialogue = null) {
        this.dialogue = dialogue;
    }

    getDialogue() {
        // console.log('inside dialogue my this is', this)
        return this.dialogue;
    }
}

let store = new Store();

export default store;
