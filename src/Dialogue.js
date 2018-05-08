export default class Dialogue {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.responses = [];
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
