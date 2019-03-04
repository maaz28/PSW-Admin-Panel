import { LOGGEDIN, LOGGED_OUT } from "../actions/root.action";

const INITIAL_STATE = {
    name : '',
    email : '',
    time : '',
    uuid : '',
    is_login : false
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGGEDIN:
        return({
            ...state,
            name : action.payload.name,
            email : action.payload.email,
            time : action.payload.time,
            uuid : action.payload.uid,
            is_login : true
        })
        case LOGGED_OUT:
        return({ 
            ...state,
            is_login : false
        })
        default: 
        return state
    }
}