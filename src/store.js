class Store {
    constructor() {
        this.cool = 5;
    }
    makeCooler() {
        this.cool++;
    }
    getTemperature() {
        return -this.cool;
    }
}

let store = new Store();

export default store;
