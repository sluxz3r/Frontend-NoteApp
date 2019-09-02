import { combineReducers } from 'redux';
import note from './note'
import noteid from './noteid'
import cat from './cat'

const appReducer = combineReducers({
    note,
    noteid,
    cat
});

export default appReducer;