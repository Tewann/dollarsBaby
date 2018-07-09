//Navigation/Navigation.js

import { DrawerActions, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessagesReceivedScreen from '../Components/MessageReceivedComponents/MessagesReceivedScreen/MessagesReceivedScreen';
import GroupScreen from '../Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent'
import Loading from '../Components/LoadingScreenComponent/Loading'
import SignUp from '../Components/SignUpScreenComponents/SignUp'
import Login from '../Components/LoginScreenComponent/Login'
import ForgottenPsswrd from '../Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd'
//import { Button } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const topTabBarNavigation = createMaterialTopTabNavigator(
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
            indicatorStyle: { backgroundColor: '#f0e5dc' },
        },
    })





const DrawerButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Text>Menu</Text>
        </TouchableOpacity>
    );
};
const MainStackNavigator = createStackNavigator({
    Mainscreen: {
        screen: topTabBarNavigation,



        navigationOptions: ({ navigation }) => ({
            title: 'eBlink',
            headerTitleStyle: {
                marginLeft: 30,
            },
            headerStyle: {
                backgroundColor: '#3a485c',
            },
            headerTintColor: '#f0e5dc',
            headerLeft: <DrawerButton navigation={navigation} />
        })
    },
});

const DrawerStack = createDrawerNavigator(
    {
        screen1: { screen: MainStackNavigator },
        screen2: { screen: Login },
        screen3: { screen: ForgottenPsswrd },
        topTabBarNavigation: { screen: topTabBarNavigation }
    },
    {
        drawerWidth: 200,
    }
)

const MainSwitchNavigator = createSwitchNavigator(
    {
        Loading,
        DrawerStack,
        SignUp,
        Login,
        ForgottenPsswrd
    },
    {
        initialRouteName: 'Loading'
    }
)



export default MainSwitchNavigator