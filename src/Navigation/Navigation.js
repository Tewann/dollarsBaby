//Navigation/Navigation.js

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessagesReceivedScreen from '../Components/MessageReceivedComponents/MessagesReceivedScreen/MessagesReceivedScreen';
import GroupScreen from '../Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent'

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
                GroupScreen: {
                    screen: GroupScreen,
                    navigationOptions: {
                        title: 'Groupes'
                    }
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
});


export default MainStackNavigator