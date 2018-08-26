// src/Components/LoadingScreenComponents/Loading.js
// Loading Screen

import React from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import { Notification } from 'react-native-firebase'
import { connect } from 'react-redux'
import { fetchContacts, setUpRegistrationTokenToFirebase, getUserDataForLoginScreen } from '../../Services/firebaseFunctions'

class Loading extends React.Component {

    componentDidMount = async () => {
        // reset which screen to show for group screnn (set group list)
        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'Hunx6'}
        this.props.dispatch(action)
        

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // user is authentificated
                const username = user.displayName
                const checkingPermission = await this.checkingNotificationsPermissions(user)
                const checkingCurrentToken = await this.checkingCurrentRegistrationToken(username)
                this.goToMainScreen(user)
            } else {
                // there no user connected
                // going to login screen
                this.props.navigation.navigate('Login')
            }
        })


        if (this.props.currentUser.name === null) {
            const userInformations = await getUserDataForLoginScreen()
            const action = { type: "SET_CURRENT_USER_NAME", value: userInformations.userName }
            this.props.dispatch(action)
            const action2 = { type: "SET_CURRENT_USER_EMAIL", value: userInformations.userEmail }
            this.props.dispatch(action2)
        }
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        // Create the channel for android
        firebase.notifications().android.createChannel(channel);

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            const notif = new firebase.notifications.Notification()
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setBody(notification.body)
                .setSound(notification.sound)
            notif.android.setChannelId(channel)
            notif.android.setAutoCancel(true);
            firebase.notifications().displayNotification(notif)
        });
    }

    goToMainScreen(user) {
        if (user.displayName === null) {
            // deals with user is null error 
            // (example : app crashes when setting display name)
            this.props.navigation.navigate('GetDisplayName')
        } else {
            // navigate to main screen and start listening to database
            this.props.dispatch(fetchContacts(user.displayName))
            this.props.navigation.navigate('DrawerStack')
        }
    }

    checkingNotificationsPermissions = async (user) => {
        // checking if user has granted permission for notifications
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
            //user has permissions
            // navigates to main screen
            return
        } else {
            // user doesn't have permission
            // requesting permissions from user
            const requestPermission = await this.requestingPermission(user)
            return
        }
    }

    requestingPermission = async (user) => {
        try {
            await firebase.messaging().requestPermission();
            // user has authorised
            // navigate to main screen
            return
        } catch (error) {
            // user has rejected permissions
            // display Alert
            Alert.alert(
                'Permissions refusées',
                "Pour profiter pleinement de l'application, nous vous recommandons d'accepter les notifications"
                [
                {
                    text: 'Autoriser les notifications', onPress: () => this.requestingPermission()
                },
                {
                    text: 'Continuer sans notifications', onPress: () => this.goToMainScreen(user)
                }
                ]
            )

        }
    }

    checkingCurrentRegistrationToken = async (username) => {
        if (this.props.currentUser.registrationToken != null) {
            // a registration token is in redux store
            // set up listener to token modifications
            this.onTokenRefreshListener = firebase.messaging()
                .onTokenRefresh(fcmToken => {
                    // if token changes
                    // store token in database
                    // store token in redux store
                    setUpRegistrationTokenToFirebase(fcmToken, username)
                    const action = { type: 'TOKEN_MODIFICATION', value: fcmToken }
                    this.props.dispatch(action)
                })
        } else {
            // there is no registration token in redux store
            const fcmToken = await firebase.messaging().getToken()
            if (fcmToken) {
                // calls firebase service function
                // store token in database
                // store token in redux store
                setUpRegistrationTokenToFirebase(fcmToken, username)
                const action = { type: 'TOKEN_MODIFICATION', value: fcmToken }
                this.props.dispatch(action)

            } else {
                console.log('user doesnt have a token yet')
            }

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>eBlink</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations
    }
}
export default connect(mapStateToProps)(Loading)