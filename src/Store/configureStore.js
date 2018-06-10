//Store/configureStore.js

import { createStore } from 'redux'
import contactManagment from './Reducers/contactReducer'

export default createStore(contactManagment)