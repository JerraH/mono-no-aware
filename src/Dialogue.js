export default class Dialogue {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.responses = [];
    }

    addResponse(response, cb) {
        this.responses.push({
            response,
            cb
        })
    }
}
