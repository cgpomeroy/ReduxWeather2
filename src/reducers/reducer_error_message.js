import { HANDLE_PROMISE_REJECTED, CLEAR_ERROR_MESSAGE } from "../actions";

export default function (state=null, action) {
    switch(action.type){
        case HANDLE_PROMISE_REJECTED:
            return "Hmm. Couldn't find any cities by that name in the United States. Try again.";
        case CLEAR_ERROR_MESSAGE:
            return null
    }
     return state;
}