import { FETCH_WEATHER, HANDLE_PROMISE_REJECTED } from '../actions'

export default function(state = [], action) {
    if(action.error){
        action.type = HANDLE_PROMISE_REJECTED;
    }
    switch(action.type){
        case FETCH_WEATHER:
            return [ action.payload.data, ...state];
    }
    return state;
}