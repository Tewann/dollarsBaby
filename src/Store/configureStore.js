//Store/configureStore.js

import { createStore, combineReducers } from 'redux'
import contactManagment from './Reducers/contactReducer'
import displayMessagesList from './Reducers/messageReducer'

export default createStore(combineReducers({contactManagment, displayMessagesList}))