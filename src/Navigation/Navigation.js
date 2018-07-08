//Navigation/Navigation.js

import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessagesReceivedScreen from '../Components/MessageReceivedComponents/MessagesReceivedScreen/MessagesReceivedScreen';
import GroupScreen from '../Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent'
import Loading from '../Components/LoadingScreenComponent/Loading'
import SignUp from '../Components/SignUpScreenComponents/SignUp'
import Login from '../Components/LoginScreenComponent/Login'
import ForgottenPsswrd from '../Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd'

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

const MainSwitchNavigator = createSwitchNavigator(
    {
        Loading,
        MainStackNavigator,
        SignUp,
        Login,
        ForgottenPsswrd
    },
    {
        initialRouteName: 'Loading'
    }
)

export default MainSwitchNavigator