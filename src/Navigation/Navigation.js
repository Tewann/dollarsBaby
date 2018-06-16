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
                    style: { backgroundColor: '#3a485c' },
                    indicatorStyle: {backgroundColor: '#f0e5dc'}
                    
                },
            }),
        navigationOptions: {
            title: 'eBlink',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#3a485c',
                //backgroundColor: '#5675D3',
            },
            headerTintColor: '#f0e5dc',
        },
    },
});

export default MainStackNavigator