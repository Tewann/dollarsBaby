//Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactsScreen/ContactsScreen'
import MessageHistoric from '../Components/MessagesHistoric/MessageHistoric'

const SearchStackNavigator = createStackNavigator({
    ContactsScreen: {
        screen: ContactsScreen,
        navigationOption: {
            title: 'EZy'
        }
    }
})

export default SearchStackNavigator