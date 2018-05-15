import store from './store';
import utilityFunctions from './utilityFunctions'
var nlp = require('compromise')

export default class Dialogue {
    parseNode(guids, node) {
        const parseVariables = function(next) {
            let variables = {};
            let cb;
            while (next && next.type === 'Set') {
                variables[next.variable] = next.value;
                next = guids[next.next];
            }
            if (Object.keys(variables).length) {
                cb = () => {
                    Object.keys(variables).forEach(variableName => {
                        let {character, variable} = utilityFunctions.parseVariableName(variableName);
                        // console.log("UPDATE", character, variable, variables[variableName]);
                        store.updateCharacterStat(character, variable, variables[variableName]);
                    })
                }
            }
            return {
                next,
                cb
            }
        }

        const parseBranch = function(node) {
            let variableName = node.variable;
            let {character, variable} = utilityFunctions.parseVariableName(variableName);
            return {
                childFn: () => {
                    let chosen = '_default';
                    Object.keys(node.branches).forEach(branch => {
                        // evaluate branch
                        let value = store.getCharacterStat(character, variable);
                        if (utilityFunctions.testExpression(branch, value)) {
                            chosen = branch;
                        }
                    })
                    return new Dialogue().parseNode(guids, guids[node.branches[chosen]]);
                }
            }
        }
        
        switch (node.type) {
            case 'Node':
            case 'Text': {
                this.name = node.actor;
                this.text = node.name;
                this.responses = [];
                if (node.choices) {
                    node.choices.forEach(guid => {
                        let choice = guids[guid];
                        let {next, cb} = parseVariables(guids[choice.next]); 
                        this.responses.push({
                            text: choice.name,
                            child: next && new Dialogue().parseNode(guids, next),
                            cb});
                    })
                } else if (node.next) {
                    let next = guids[node.next];
                    if (next.type === 'Branch') {
                        this.responses.push(parseBranch(next));
                    } else {
                        this.responses.push({
                            child: new Dialogue().parseNode(guids, node.next)
                        })
                    }
                }
                break;
            }
            default:
                console.log("SOMETHING WENT WRONG");
                break;
        }

        return this;
    }
    
    parseFromTalkIt(arr) {
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
        let pro1 = beloved.pronouns[0]
        let pro2 = beloved.pronouns[1]
        let pro3 = beloved.pronouns[2]
        let pro4 = beloved.pronouns[3]
        // parse guids
        let guids = {};
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
        this.parseNode(guids, root);
    }

    // parseFromObject(data) {
    //     let {dialogue, character, protag} = data;
    //     this.name = dialogue.name;
    //     this.text = dialogue.textFrom;
    //     this.responses = [];
    //     if (dialogue.responses) {
    //         this.responses = dialogue.responses.map(response => {
    //             let data = {
    //                 response: response.textTo
    //             }
    //             if (response.variables && character) {
    //                 data.cb = () => {
    //                     character.updateVariables(response.variables)
    //                 }
    //             }
    //             if (response.next) {
    //                 let params = Object.assign({}, response.next);
    //                 params.name = dialogue.name;
    //                 data.child = new Dialogue({
    //                     dialogue: params,
    //                     character,
    //                     protag
    //                 });
    //             }
    //             return data;
    //         })
    //     }
    // }

    // Examples:
    // new Dialogue({name: "Akiko", text: "Hi there", responses: [...]})
    // new Dialogue([...parsed TalkIt JSON...])
    // OBSOLETE: new Dialogue({dialogue: ...}, character, protag)
    constructor(data = {}) {
        if (Array.isArray(data)) {
            this.parseFromTalkIt(data);
        // } else if (data.dialogue) {
        //     this.parseFromObject(data);
        } else {
            this.name = data.name || 'Who dis?';
            this.text = data.text || "I think I'm supposed to say something.";
            this.responses = data.responses || [];
        }
    }
}
