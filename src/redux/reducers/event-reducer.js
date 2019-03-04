import { EVENT_DETAILS } from "../actions/event-actions";

const INITIAL_STATE = {
    date: {
        start: new Date().getTime(),
        end: new Date().getTime()
        },
        user: {
        name: "",
        email: "",
        id: "",
        avatar: ""
        },
        _id : "",
        title: "",
        venue: "",
        tickets: "",
        website_link: "",
        image_url: "",
        detail_description: "",
        short_description: "",
        edit : false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EVENT_DETAILS:
        return({
            ...action.payload
        })
        // case LOGGED_OUT:
        // return({ 
        //     ...state,
        //     is_login : false
        // })
        default: 
        return state
    }
}