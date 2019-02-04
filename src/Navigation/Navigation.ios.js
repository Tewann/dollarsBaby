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

import React from "react";
import { Icon } from "react-native-elements";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";

import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import firebase from "react-native-firebase";
import styles from "./styles";
import { strings } from "../i18n";

import { SafeAreaView } from "react-navigation";

import Dimensions from "Dimensions";
import { isIphoneX } from "../Services/is-iphone-x";

// same height as add contact bar on contact screen / group screen
const { height, width } = Dimensions.get("window");
const itemWidth = width - 35;
const itemHeight = height / 20 + 9;

//*
// Check iPhone version
// Used to center icons
// If iPhoneX : react native does center icons automaticly : returns null
// If iPhone version older than iPhoneX : return itemHeight/1.2 : center icons
//*
const centerIcons = isIphoneX() ? null : itemHeight / 1.2;

//
// Custom components for navigation
//

const DrawerButton = ({ navigation }) => {
  return (
    <View style={{ marginLeft: 15, paddingTop: 1 }}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#07416b' }}>
      <LinearGradient
        colors={['#07416b', '#88b097', '#88b097', '#07416b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.CustomDrawerLinearGradient}
      >
        <Text style={styles.CustomDrawerTitle}>eBlink</Text>
      </LinearGradient >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProfilScreen")}
        style={styles.CustomDrawerItemContainer}
      >
        <EvilIcons
          name="user"
          type="EvilIcons"
          size={30}
          color="black"
          style={styles.CustomDrawerIcon}
        />
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
        onPress={() => firebase.auth().signOut().catch(error => {
          console.log(error)
          this.props.navigation.navigate('Login')
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
    </SafeAreaView >
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
            iconStyle={{ paddingBottom: centerIcons }}
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
            size={25}
            color="#07416b"
            iconStyle={{ paddingBottom: centerIcons }}
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
            iconStyle={{ paddingBottom: centerIcons, color: "grey" }}
          />
        )
      }
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      style: { backgroundColor: "lightgrey", height: itemHeight },
      indicatorStyle: { backgroundColor: "white" },
      activeTintColor: "#07416b",
      inactiveTintColor: "#07416b",
      showIcon: true,
      showLabel: false
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    Mainscreen: {
      screen: topTabBarNavigation,
      navigationOptions: ({ navigation }) => ({
        header:
          <LinearGradient
            colors={['#07416b', '#88b097', '#88b097', '#07416b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CustomNavigationHeaderContainer}
          >
            <DrawerButton
              navigation={navigation}
              style={{ flex: 1 }}
            />
            <Text style={styles.CustomNavigationHeaderText}>eBlink</Text>
          </LinearGradient>
      })
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('GroupsList')} />,
        headerTitle:
          <HeaderComponent />,
      })
    },
    GroupScreen: {
      screen: GroupScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle:
          <HeaderForGroupScreen />,
      })
    }
  },
  {
    headerLayoutPreset: 'center',
  }
);

const DrawerStack = createDrawerNavigator(
  {
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
    //drawerLockMode: 'locked-closed'
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
