//Navigation/Navigation.js

import { HeaderBackButton, createAppContainer, DrawerActions, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createDrawerNavigator } from "react-navigation";

import ContactsList from '../Components/ContactScreenComponents/ContactsList/ContactsList'
import MessageHistory from "../Components/MessageHistoryComponents/MessageHistoryScreen";
import GroupsList from '../Components/GroupsScreen/GroupsListScreen/GroupsListScreen'
import GroupScreen from '../Components/GroupsScreen/GroupScreen/GroupScreen'
import Loading from "../Components/LoadingScreenComponent/Loading";
import SignUp from "../Components/SignUpScreenComponents/SignUp";
import Login from "../Components/LoginScreenComponent/Login";
import ForgottenPsswrd from "../Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd";
import ProfilScreen from "../Components/ProfilScreenComponents/ProfilScreen";
import GetDisplayName from "../Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName";
import TermsOfService from "../Components/TermsOfServiceScreen/TermsOfService";
import AddContactScreen from '../Components/AddContactScreen/AddContactScreen'
import ContactScreen from '../Components/ContactScreenComponents/ContactScreen/ContactScreen'
import HeaderComponent from '../Components/ContactScreenComponents/ContactScreen/HeaderComponent/HeaderComponent'
import HeaderForGroupScreen from '../Components/GroupsScreen/GroupScreen/HeaderForGroupScreen/HeaderForGroupScreen'

import CreateCustomMessageScreen from '../Components/CreateCustomMessageScreen/CreateCustomMessageScreen'
import AddGroupsScreen from '../Components/AddGroupsScreen/AddGroupsScreen'
import OptionsScreen from '../Components/OptionsScreen/OptionsScreen'

import React from "react";
import { Icon } from "react-native-elements";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";

import { View, Text, TouchableOpacity } from "react-native";
//import LinearGradient from "react-native-linear-gradient";

import firebase from "react-native-firebase";
import styles from "./styles";
import { strings } from "../i18n";

import { SafeAreaView } from "react-navigation";

import Dimensions from "Dimensions";
//import { isIphoneX } from "../Services/is-iphone-x";

// same height as add contact bar on contact screen / group screen
const { height, width } = Dimensions.get("window");
const itemWidth = width - 35;
const itemHeight = height / 17;

//*
// Check iPhone version
// Used to center icons
// If iPhoneX : react native does center icons automaticly : returns null
// If iPhone version older than iPhoneX : return itemHeight/1.2 : center icons
//*
//const centerIcons = /* isIphoneX() ? null : */ itemHeight / 0.5;

//
// Custom components for navigation
//

const DrawerButton = ({ navigation }) => {
  return (
    <View style={{ paddingLeft: 15, paddingTop: 1 }}>
      <Icon
        name="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        color="white"
        underlayColor="transparent"
      />
    </View>
  );
};

const CustomDrawerContentComponent = props => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <View
          /* colors={['#07416b', '#88b097', '#88b097', '#07416b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}*/
          style={styles.CustomDrawerLinearGradient}
        >
          <Text style={styles.CustomDrawerTitle}>eBlink</Text>
        </View >
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProfilScreen")}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <EvilIcons
            name="user"
            type="EvilIcons"
            size={30}
            color="black"
          //style={styles.CustomDrawerIcon}
          />
        </View>
        <Text style={styles.CustomDrawerText}>{strings("navigation.profil")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddContactScreen')}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <Icon
            name='person-add'
            type='materialicons'
            color='black'
          />
        </View>
        <Text style={styles.CustomDrawerText}>{strings('navigation.add_contact_screen')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddGroupsScreen')}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <Icon
            name='group-add'
            type='materialicons'
            color='black'
          />
        </View>
        <Text style={styles.CustomDrawerText}>{strings('navigation.add_groups_screen')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('CreateCustomMessageScreen')}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <Icon
            name='new-message'
            type='entypo'
            color='black'
          />
        </View>
        <Text style={styles.CustomDrawerText}>{strings('navigation.create_message')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('OptionsScreen')}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <Icon
            name='ios-options'
            type='ionicon'
            color='black'
          />
        </View>
        <Text style={styles.CustomDrawerText}>{strings('navigation.options')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => firebase.auth().signOut().catch(error => {
          console.log(error)
          props.navigation.navigate('Login')
        })}
        style={styles.CustomDrawerItemContainer}
      >
        <View style={styles.CustomDrawerIcon}>
          <Octicons
            name='sign-out'
            type='Octicons'
            size={25}
            color='black'
            style={{ marginLeft: 10 }}
          />
        </View>
        <Text style={[styles.CustomDrawerText, { paddingTop: 1 }]}>{strings('navigation.disconnect')}</Text>
      </TouchableOpacity>
    </View>
  );
};

//
// Navigators
//

const topTabBarNavigation = createMaterialTopTabNavigator(
  {
    ContactsList: {
      screen: ContactsList,
      navigationOptions: {
        title: strings("navigation.contacts_screen"),
        tabBarOnPress: null,
        tabBarIcon: (
          <Icon
            name="user"
            type="feather"
            size={25}
            color="#07416b"
          // iconStyle={{ paddingBottom: centerIcons }}
          />
        )
      }
    },
    GroupsList: {
      screen: GroupsList,
      navigationOptions: {
        title: strings("navigation.group_screen"),
        tabBarIcon: (
          <Icon
            name="users"
            type="feather"
            //size={25}
            color="#07416b"
          //iconStyle={{ paddingBottom: centerIcons }}
          />
        )
      }
    },
    MessageHistory: {
      screen: MessageHistory,
      navigationOptions: {
        title: strings("navigation.message_history"),
        tabBarIcon: (
          <Icon
            name="chat"
            type="entypo"
            size={25}
            color="#07416b"
          //iconStyle={{ paddingBottom: centerIcons, color: "grey" }}
          />
        )
      }
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      style: { backgroundColor: "white" },
      indicatorStyle: { backgroundColor: "#07416b" },
      activeTintColor: "blue",
      inactiveTintColor: "lightgrey",
      showIcon: true,
      showLabel: false,
     /*  iconStyle: {
        width: 35,
        height: 60
      }, */
      tabStyle: {
        height: itemHeight
      }
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    Mainscreen: {
      screen: topTabBarNavigation,
      navigationOptions: ({ navigation }) => ({
        header:
          <SafeAreaView style={{ backgroundColor: '#63869f' }}>
            <View
              //colors={['#07416b', '#88b097', '#88b097', '#07416b']}
              //colors={['white', 'white']}
              //start={{ x: 0, y: 0 }}
              //end={{ x: 1, y: 1 }}
              style={styles.CustomNavigationHeaderContainerForIos}
            >
              <DrawerButton
                navigation={navigation}
                style={{ flex: 1 }}
              />
              <Text style={styles.CustomNavigationHeaderText}>eBlink</Text>
            </View>
          </SafeAreaView>
      })
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('ContactsList')} tintColor='white' />,
        headerTitle:
          <HeaderComponent />,
        headerStyle: {
          backgroundColor: '#63869f',
        },
      })
    },
    GroupScreen: {
      screen: GroupScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('GroupsList')} tintColor='white' />,
        headerTitle:
          <HeaderForGroupScreen />,
        headerStyle: {
          backgroundColor: '#63869f',
        },
      })
    }
  },
  {
    headerLayoutPreset: 'center',
  }
);

const DrawerStack = createDrawerNavigator(
  {
    OptionsScreen: { screen: OptionsScreen },
    CreateCustomMessageScreen: { screen: CreateCustomMessageScreen },
    AddContactScreen: { screen: AddContactScreen },
    AddGroupsScreen: { screen: AddGroupsScreen },
    ProfilScreen: { screen: ProfilScreen },
    MainStackNavigator: { screen: MainStackNavigator }
  },
  {
    initialRouteName: "MainStackNavigator",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerWidth: 250,
    drawerLockMode: 'locked-closed'
  },
);

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
    TermsOfService,
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(MainSwitchNavigator);
