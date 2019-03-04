// import reducer from './reducer';
import {combineReducers} from 'redux';
import userReducer from './user-reducer';
import eventReducer from './event-reducer';

export default combineReducers({
    user_reducer : userReducer,
    event_reducer : eventReducer
});