import { HANDLE_PROMISE_REJECTED, CLEAR_ERROR_MESSAGE } from "../actions";

export default function (state=null, action) {
    switch(action.type){
        case HANDLE_PROMISE_REJECTED:
            return "There was a problem with your request. Please try again.";
        case CLEAR_ERROR_MESSAGE:
            return null
    }
     return state;
}