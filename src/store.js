class Store {
    constructor() {
        this.pronoun = '';
        this.beloved = '';
    }

    setPronoun(pronoun) {
        this.pronoun = pronoun;
    }

    setBeloved(beloved) {
        this.beloved = beloved;
    }

    getPronoun() {
        return this.pronoun;
    }

    getBeloved() {
        return this.beloved;
    }
    /**
     * Character methods
     */
}


let store = new Store();

export default store;
