const convo = {}

/**
 * ACTION TYPES
 */

const START_CONVO = 'START_CONVO';
const SET_REPLY = 'SET_REPLY'; // what did your character say or do in response
const GET_RESPONSE = 'SET_REPLY'; //in other words. get the next branch
const CHECK_ITEMS = 'CHECK_ITEMS';
const GIVE_ITEM = 'GIVE_ITEM';
const GET_ITEM = 'GET_ITEM';



const reducer = (state = initState, action) => {
    switch (action.type) {
        case (START_CONVO):
            getConvo(1)
            break;
        case (END_CONVO):
            return state;



        default:
            return state
    }
}

export default reducer
