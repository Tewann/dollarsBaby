//Navigation/Navigation.js

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessagesReceivedScreen from '../Components/MessageReceivedComponents/MessagesReceivedScreen/MessagesReceivedScreen';
import MessageListScreen from '../Components/ContactScreenComponents/MessageListScreen/MessageListScreen'

const MainStackNavigator = createStackNavigator({
    Mainscreen: {
        screen: createMaterialTopTabNavigator(
            {
                ContactsScreen: {
                    screen: ContactsScreen,
                    navigationOptions: {
                        title: 'Contacts',
                        tabBarOnPress: null
                    },
                },
                MessagesReceived: {
                    screen: MessagesReceivedScreen,
                    navigationOptions: {
                        title: 'Messages reçus'
                    },
                },
            },
            {
                tabBarOptions: {
                    style: { backgroundColor: '#3a485c' },
                    indicatorStyle: { backgroundColor: '#f0e5dc' }

                },
            }),
        navigationOptions: {
            title: 'eBlink',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#3a485c',
            },
            headerTintColor: '#f0e5dc',
        },
    },

    MessageListScreen: {
        screen: MessageListScreen,
        navigationOptions: {
            title: 'Messages',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#3a485c',
            },
            headerTintColor: '#f0e5dc',
        },

    },
});


export default MainStackNavigator