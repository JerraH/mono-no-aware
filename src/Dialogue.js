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

    parseFromObject(obj) {
        this.name = obj.name;
        this.text = obj.textFrom;
        this.responses = [];
        if (obj.responses) {
            this.responses = obj.responses.map(response => {
                let data = {
                    response: response.textTo
                }
                if (response.next) {           
                    let params = Object.assign({}, response.next);
                    params.name = obj.name;
                    data.child = new Dialogue(params);
                }
                return data;
            })
        }
    }

    // Examples:
    // new Dialogue("Akiko", "Hi there")
    // new Dialogue({... parsed JSON goes here ...})
    constructor(objOrName, text) {
        if (objOrName instanceof String) {
            this.name = name;
            this.text = text;
            this.responses = [];
        } else {
            this.parseFromObject(objOrName);
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
