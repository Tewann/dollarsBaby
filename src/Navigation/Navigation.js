//Navigation/Navigation.js

import { DrawerItems, DrawerActions, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessagesReceivedScreen from '../Components/MessageReceivedComponents/MessagesReceivedScreen/MessagesReceivedScreen';
import GroupScreen from '../Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent'
import Loading from '../Components/LoadingScreenComponent/Loading'
import SignUp from '../Components/SignUpScreenComponents/SignUp'
import Login from '../Components/LoginScreenComponent/Login'
import ForgottenPsswrd from '../Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd'
import ProfilScreen from '../Components/ProfilScreenComponents/ProfilScreen'

import React from 'react'
import { Icon } from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
// name='account-off'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//
import Octicons from 'react-native-vector-icons/Octicons'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import firebase from 'react-native-firebase'

import styles from './styles'

//
// Custom components for navigation
//

const DrawerButton = ({ navigation }) => {
    return (
        <View style={{ marginLeft: 15, paddingTop: 1 }}>
            <Icon
                name='menu'
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                color='white'
            />
        </View>

    );
};

const CustomDrawerContentComponent = (props) => {
    return (
    <LinearGradient
        colors={[ '#3a485c', '#88b097', 'white' ]}
        style={{ flex: 1 }} 
    >
        <Text style={styles.CustomDrawerTitle}>eBlink</Text>
        <TouchableOpacity 
            onPress={() => props.navigation.navigate('ProfilScreen')}
            style={styles.CustomDrawerItemContainer}
        >
            <EvilIcons 
                name='user'
                type='EvilIcons'
                size={30}
                color='white'
                style={styles.CustomDrawerIcon}
            />
            <Text style={styles.CustomDrawerText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => firebase.auth().signOut().catch(error => {
                console.log(error)
            })}
            style={styles.CustomDrawerItemContainer}
        >
            <Octicons 
                name='sign-out'
                type='Octicons'
                size={25}
                color='white'
                style={{ marginLeft: 10 }}
            />
            <Text style={[styles.CustomDrawerText, {paddingTop: 1}]}>Se déconnecter</Text>
        </TouchableOpacity>
    </LinearGradient>
    )
}


//
// Navigators
//

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






const MainStackNavigator = createStackNavigator({
    Mainscreen: {
        screen: topTabBarNavigation,



        navigationOptions: ({ navigation }) => ({
            title: 'eBlink',
            headerTitleStyle: {
                marginLeft: 0,
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
        ProfilScreen: { screen: ProfilScreen },
        MainStackNavigator: { screen: MainStackNavigator }
    },
    {
        initialRouteName: 'ProfilScreen',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerWidth: 175,
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