import items from './itemList'
import Constants from './constants'

class Store {
    reset() {
        this.pronoun = '';
        this.beloved = {title: '', pronouns: []};
        this.dialogue = null;//{title: "Hello my Baby", text: "HELLO MY BABY, HELLO MY HONEY, HELLO MY RAGTIME GAL / SEND ME A KISS BY WIRE / BABY MY HEART'S ON FIRE / IF YOU REFUSE ME, HONEY YOU LOSE ME, THEN YOU'LL BE LEFT ALONE SO BABY TELEPHONE AND TELL ME I'M YOUR OWN"};
        this.inventory = [items.bow, items.calligraphyBrush];
        this.allItems = {};
        this.inventoryActive = false;
        this.interactionActive = false;
        this.currentItem = {};
        this.currentRoom = 0;
        this.cure1 = items.bow;
        this.cure2 = items.sake;
        this.music = null;
        this.inConversation = false;
        this.timers = [];
        this.characterStats = {};
    }

    constructor() {
        this.reset();
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
        if (beloved === Constants.PRONOUN_SHE) {
            this.beloved.pronouns.push('she')
            this.beloved.pronouns.push('her')
            this.beloved.pronouns.push('hers')
            this.beloved.pronouns.push('herself')
            this.beloved.title = 'Empress'
        } else if (beloved === Constants.PRONOUN_HE) {
            this.beloved.pronouns.push('he')
            this.beloved.pronouns.push('him')
            this.beloved.pronouns.push('his')
            this.beloved.pronouns.push('himself')
            this.beloved.title = 'Emperor'
        } else {
            this.beloved.pronouns.push('they')
            this.beloved.pronouns.push('them');
            this.beloved.pronouns.push('theirs')
            this.beloved.pronouns.push('themselves')
            this.beloved.title = 'Eminence'
        }
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

    //dialogue scene

    getDialogueActive() {
        return this.inConversation;
    }

    setDialogueInactive() {
        this.inConversation = false;

    }
    setDialogueActive() {
        this.inConversation = true;
    }

    // The player's inventory

    searchInventory(id) {
        return this.inventory.find(item => item.id === id);
    }

    addToInventory(item) {
        if (!this.inventory.includes(item)) {
            this.inventory.push(item);
        }
    }

    getInventory() {
        return this.inventory;
    }

    removeFromInventory(item) {
        this.inventory = this.inventory.filter(inv => inv !== item)
    }

    setInventoryActive(active) {
        this.inventoryActive = active;
    }

    getInventoryActive() {
        return this.inventoryActive;
    }

    setMusic(music = null) {
        this.music = music;
    }

    getMusic() {
        return this.music;
    }

    setInteractionActive(active) {
        this.inventoryActive = active;
    }

    getInteractionActive() {
        return this.inventoryActive;
    }

    //Items

    setAllItems(items) {
        this.allItems = items;
    }

    getAllItems() {
        return this.allItems;
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
    setTime(time) {
        this.timeLeft = time
    }
    getTime() {
        return this.timeLeft;
    }
    setTextboxConstants(obj) {
        this.textboxConstants = obj
    }
    getTextboxConstants() {
        return this.textboxConstants
    }

    //which room were/are you in?
    setCurrentRoom(newRoom) {
        this.currentRoom = newRoom;
    }
    getCurrentRoom() {
        return this.currentRoom;
    }

    updateCharacterStat(name, variable, value) {
        // sanitize the inputs
        name = name.toLowerCase();
        variable = variable.toLowerCase();
        value = value.toLowerCase();

        let stats = this.characterStats[name] || {};
        // PERCENTAGES: 0 .. 100
        stats[variable] = Math.min(Math.max(0, (stats[variable] || 0) + parseInt(value)), 100);
        // console.log("ADDED", parseInt(value), "TO", name + "'s", variable);
        this.characterStats[name] = stats;
    }
    
    getCharacterStat(name, variable) {
        return (this.characterStats[name] || {})[variable];
    }
}

let store = new Store();

export default store;
