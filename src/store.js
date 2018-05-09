import items from './itemList'

class Store {
    constructor() {
        this.pronoun = '';
        this.beloved = '';
        this.dialogue = null;//{title: "Hello my Baby", text: "HELLO MY BABY, HELLO MY HONEY, HELLO MY RAGTIME GAL / SEND ME A KISS BY WIRE / BABY MY HEART'S ON FIRE / IF YOU REFUSE ME, HONEY YOU LOSE ME, THEN YOU'LL BE LEFT ALONE SO BABY TELEPHONE AND TELL ME I'M YOUR OWN"};
        this.inventory = [items.bow, items.calligraphyBrush, items.sake];
        this.inventoryActive = false;
        this.interactionActive = false;
        this.currentItem = {};
        this.cure1 = items.bow;
        this.cure2 = items.sake;
        this.inConversation = false;
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

    // The player's inventory

    addToInventory(item) {
        this.inventory.push(item);
    }

    getInventory() {
        return this.inventory;
    }

    removeFromInventory(item) {
        let index = this.inventory.indexOf(item);
        if (index !== -1) {
            this.inventory.splice(index, 1);
        }
    }

    setInventoryActive(active) {
        this.inventoryActive = active;
    }

    getInventoryActive() {
        return this.inventoryActive;
    }

    setInteractionActive(active) {
        this.inventoryActive = active;
    }

    getInteractionActive() {
        return this.inventoryActive;
    }

    setCurrentItem(item) {
        this.currentItem = item;
    }

    getCurrentItem() {
        return this.currentItem;
    }

    getDialogueActive() {
        return this.inConversation;
    }
    setDialogueInactive() {
        this.inConversation = false;
    }
    setDialogueActive() {
        this.inConversation = true;
    }


}

let store = new Store();

export default store;
