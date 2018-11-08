//Navigation/Navigation.js

import { DrawerItems, DrawerActions, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import ContactsScreen from '../Components/ContactScreenComponents/ContactsScreen/ContactsScreen'
import MessageHistory from '../Components/MessageHistoryComponents/MessageHistoryScreen';
import GroupScreen from '../Components/GroupScreenComponents/GroupScreenComponent'
import Loading from '../Components/LoadingScreenComponent/Loading'
import SignUp from '../Components/SignUpScreenComponents/SignUp'
import Login from '../Components/LoginScreenComponent/Login'
import ForgottenPsswrd from '../Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd'
import ProfilScreen from '../Components/ProfilScreenComponents/ProfilScreen'
import GetDisplayName from '../Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName'
import TermsOfService from '../Components/TermsOfServiceScreen/TermsOfService'


import React from 'react'
import { Icon } from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Octicons from 'react-native-vector-icons/Octicons'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import firebase from 'react-native-firebase'

import styles from './styles'

import { strings } from '../i18n'

import Dimensions from 'Dimensions'

// same height as add contact bar on contact screen / group screen
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);
const itemHeight = height / 20 + 9

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
                underlayColor='transparent'
            />
        </View>

    );
};

const CustomDrawerContentComponent = (props) => {
    return (
        <LinearGradient
            colors={['#3a485c', '#88b097', 'white']}
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
                <Text style={styles.CustomDrawerText}>{strings('navigation.profil')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => firebase.auth().signOut().catch(error => {
                    console.log(error)
                    this.props.navigation.navigate('Login')
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
                <Text style={[styles.CustomDrawerText, { paddingTop: 1 }]}>{strings('navigation.disconnect')}</Text>
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
                title: strings('navigation.contacts_screen'),
                tabBarOnPress: null,
                tabBarIcon: <Icon
                    name='user'
                    type='feather'
                    size={25}
                    color='#3a485c'
                    iconStyle={{ paddingBottom: itemHeight }}
                />
            }
        },
        /*GroupScreen: {
            screen: GroupScreen,
            navigationOptions: {
                title: strings('navigation.group_screen'),
                tabBarIcon: <Icon
                    name='users'
                    type='feather'
                    size={25}
                    color='#3a485c'
                    iconStyle={{ paddingBottom: itemHeight / 2}}
                />
            }
        },*/
        MessageHistory: {
            screen: MessageHistory,
            navigationOptions: {
                title: strings('navigation.message_history'),
                tabBarIcon: <Icon
                    name='chat'
                    type='entypo'
                    size={25}
                    color='#3a485c'
                    iconStyle={{ paddingBottom: itemHeight, color: 'grey' }}
                />
            },
        },
    },
    {
        tabBarOptions: {
            style: { backgroundColor: 'lightgrey', height: itemHeight },
            indicatorStyle: { backgroundColor: 'white' },
            activeTintColor: '#3a485c',
            inactiveTintColor: '#3a485c',
            showIcon: true,
            showLabel: false

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
            /*headerStyle: {
                backgroundColor: '#3a485c',
                //backgroundColor: '#0066ff'
            }, */
            headerBackground: (
                <LinearGradient
                    colors={['#3a485c', '#3a485c']}
                    style={{ flex: 1 }}

                />
            ),
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
        initialRouteName: 'MainStackNavigator',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerWidth: 175,
    }
)

const MainSwitchNavigator = createSwitchNavigator(
    // quand remise de loading en main screen
    // réactiver fetch message dans messagehistoryscreen.js
    {
        Loading,
        DrawerStack,
        SignUp,
        Login,
        ForgottenPsswrd,
        GetDisplayName,
        TermsOfService
    },
    {
        initialRouteName: 'Loading'
    }
)



export default MainSwitchNavigator