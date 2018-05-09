export default class Dialogue {
    // Parsed JSON Example:
    // let SO_COOL = {
    //     name: 'Akiko',
    //     textFrom: 'Can I help you with something?',
    //     responses: [{
    //         textTo: 'Yes, you definitely can!',
    //         next: {
    //             textFrom: 'I like your optimism',
    //             responses: [{
    //                 textTo: 'Cool.'
    //             }, {
    //                 textTo: 'Whatever.'
    //             }]
    //         }
    //     }, {
    //         textTo: 'Naw, boo'
    //     }]
    // }

    parseFromObject(obj, character) {
        this.name = obj.name;
        this.text = obj.textFrom;
        this.responses = [];
        if (obj.responses) {
            this.responses = obj.responses.map(response => {
                let data = {
                    response: response.textTo
                }
                if (response.madeHappy && character) {
                    data.cb = () => {
                        character.updateHappiness(response.madeHappy)
                    }
                }
                if (response.next) {           
                    let params = Object.assign({}, response.next);
                    params.name = obj.name;
                    data.child = new Dialogue(params, character);
                }
                return data;
            })
        }
    }

    // Examples:
    // new Dialogue("Akiko", "Hi there")
    // new Dialogue({... parsed JSON goes here ...}, Character)
    constructor(param1, param2) {
        if (typeof(param1) === 'string') {
            this.name = param1;
            this.text = param2;
            this.responses = [];
        } else {
            this.parseFromObject(param1, param2);
        }
    }

    // Examples:
    // addResopnse("OK great", doSomething);
    // addResopnse("OK great", doSomething, child);
    // addResopnse("OK great", child);

    addResponse(response, cb /* optional */, child /* optional */) {
        // cb is optional parameter
        if (!(cb instanceof Function)) {
            child = cb;
            cb = undefined;
        }

        this.responses.push({
            response,
            cb,
            child
        })

        return this;
    }
}
