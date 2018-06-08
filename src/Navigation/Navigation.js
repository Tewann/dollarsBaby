//Navigation/Navigation.js

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactsScreen/ContactsScreen'
import MessagesReceived from '../Components/MessagesReceived/MessagesReceived';

const MainStackNavigator = createStackNavigator({
    Mainscreen: {
        screen: createMaterialTopTabNavigator({
            ContactsScreen: {
                screen: ContactsScreen,
                navigationOptions: {
                    title: 'Contacts'
                },
            },
            MessagesReceived: {
                screen: MessagesReceived,
                navigationOptions: {
                    title: 'Historique'
                },
            },
        }),
        navigationOptions: {
            title: 'EZy',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#6f8cb7',
            },
            headerTintColor: '#f0e5dc',
        },

    },
})

export default MainStackNavigator