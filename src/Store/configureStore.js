//Store/configureStore.js

import { createStore, combineReducers } from 'redux'
import contactManagment from './Reducers/contactReducer'
import displayMessagesList from './Reducers/messageReducer'
import groupManagment from './Reducers/groupReducer'


export default createStore(combineReducers({
    contactManagment,
    displayMessagesList,
    groupManagment
}))