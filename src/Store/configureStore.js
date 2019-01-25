//Store/configureStore.js

import { createStore, applyMiddleware } from 'redux'
import { contactManagment } from './Reducers/contactReducer'
import displayMessagesList from './Reducers/messageReducer'
import groupManagment from './Reducers/groupReducer'
import getCurrentUserInformations from './Reducers/currentUserReducer'
import soundsDownloadedReducer from './Reducers/soundsDownloadedReducer'
import thunk from 'redux-thunk';
import { persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {
    contactManagment,
    displayMessagesList,
    groupManagment,
    getCurrentUserInformations,
    soundsDownloadedReducer
}),
    applyMiddleware(thunk)
)