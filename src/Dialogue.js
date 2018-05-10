export default class Dialogue {
    parseFromTalkIt(arr, character) {
        // parse guids
        let guids = {};
        arr.forEach(entry => {
            guids[entry.id] = entry;
        })

        // connect graph
        let root = arr.find(entry => entry.type === 'Node');
        this.name = root.actor;
        this.text = root.name;
        this.responses = [];

        const parseChoices = (obj, choices) => {
            choices.forEach(guid => {
                let choice = guids[guid];
                let cb;
                let child;

                let next = guids[choice.next];
                let variables = {};
                while (next && next.type === 'Set') {
                    variables[next.variable] = next.value;
                    next = guids[next.next];
                }
                if (Object.keys(variables).length) {
                    cb = () => {
                        character.updateVariables(variables);
                    }
                }

                if (next && next.type === 'Text') {
                    child = new Dialogue(next.actor, next.name);
                    if (next.choices) {
                        parseChoices(child, next.choices);
                    }
                }

                obj.addResponse({
                    text: choice.name, 
                    child, 
                    cb});
            })
        }

        parseChoices(this, root.choices);
    }

    parseFromObject(obj, character) {
        this.name = obj.name;
        this.text = obj.textFrom;
        this.responses = [];
        if (obj.responses) {
            this.responses = obj.responses.map(response => {
                let data = {
                    response: response.textTo
                }
                if (response.variables && character) {
                    data.cb = () => {
                        character.updateVariables(response.variables)
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
        } else if (Array.isArray(param1)) {
            this.parseFromTalkIt(param1, param2);
        } else {
            this.parseFromObject(param1, param2);
        }
    }

    addResponse(data) {
        this.responses.push(data);
        return this;
    }
}
