//Navigation/Navigation.js

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactsScreen/ContactsScreen'
import MessagesReceived from '../Components/MessagesReceived/MessagesReceived';

const MainStackNavigator = createStackNavigator({
    Mainscreen: {
        screen: createMaterialTopTabNavigator(
            {
                ContactsScreen: {
                    screen: ContactsScreen,
                    navigationOptions: {
                        title: 'Contacts',
                    },
                },
                MessagesReceived: {
                    screen: MessagesReceived,
                    navigationOptions: {
                        title: 'Historique'
                    },
                },
            },
            {
                tabBarOptions: {
                    style: { backgroundColor: '#9e9b98' },
                    indicatorStyle: {backgroundColor: '#a0b7c8'}
                    
                },
            }),
        navigationOptions: {
            title: 'EZy',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#a0b7c8',
            },
            headerTintColor: '#f0e5dc',
        },
    },
});

export default MainStackNavigator