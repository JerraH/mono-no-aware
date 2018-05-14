import store from './store';
var nlp = require('compromise')


export default class Dialogue {

    parseFromTalkIt(arr, character) {
        let search1 = /\bshe\b/gi
        let search2 = /\bher\b/gi
        let search3 = /\bhers\b/gi
        let search4 = /Empress/gi
        let search5 = /\bherself/gi
        let tenser1 = /(they) (does)/gi
        let tenser2 = /(does) (they)/gi
        let tenser3 = /\S+(?=\sthey)/gi
        let wordAndAfter = /(them)\s(\S+)/gi
        let wordAfter = /(they\s)\S+/gi
        let beloved = store.getBeloved();
        let title = beloved.title
        // console.log(beloved.pronouns)
        let pro1 = beloved.pronouns[0]
        let pro2 = beloved.pronouns[1]
        let pro3 = beloved.pronouns[2]
        let pro4 = beloved.pronouns[3]
        // parse guids
        let guids = {};
        // console.log(arr)
        arr.forEach(entry => {
            guids[entry.id] = entry;
            for (let property in entry) {
                if (entry[property] && entry[property] !== '' && typeof entry[property] === 'string')
                 {

                    entry[property] = entry[property].replace(search1, pro1);
                    entry[property] = entry[property].replace(search2, pro2);
                    entry[property] = entry[property].replace(search3, pro3);
                    entry[property] = entry[property].replace(search4, title);
                    entry[property] = entry[property].replace(search5, pro4)
                    if (pro1 === 'they') {

                        entry[property] = entry[property].replace(tenser1, 'they do');
                        entry[property] = entry[property].replace(tenser2, 'Do they');
                        entry[property] = entry[property].replace(search3, pro3);
                        entry[property] = entry[property].replace(search4, title);
                        entry[property] = entry[property].replace(search5, pro4);
                        entry[property] = entry[property].replace(wordAndAfter, (result) => {
                            let myResult = nlp(result)
                            if (myResult.nouns() !== []) {
                                result = result.replace('them', 'their')
                            }
                            return result;
                        })
//                         entry[property] = entry[property].replace(wordAfter, (result) => {
//                             if (nlp(result).verbs() !== []) {
//                                 result = nlp(result).verbs().toPlural()
// .text()
//                             }
//                             return result
//                         })

                    }
                }


            }
        })


        // connect graph
        let root = arr.find(entry => entry.type === 'Node');
        this.name = root.actor;
        this.text = root.name;
        this.responses = [];

        //replace all the beloved's pronouns with the correct ones
        // console.log(root)

        const parseChoices = (obj, choices) => {
            choices.forEach(guid => {
                let choice = guids[guid];
                let cb;
                let child;
                // console.log(choice)

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
        if (typeof (param1) === 'string') {
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
