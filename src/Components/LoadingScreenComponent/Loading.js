// src/Components/LoadingScreenComponents/Loading.js
// Loading Screen

import React from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import { Notification } from 'react-native-firebase'
import { connect } from 'react-redux'
import { fetchContacts, setUpRegistrationTokenToFirebase, getUserDataForLoginScreen } from '../../Services/firebaseFunctions'
import Store from '../../Store/configureStore'
import { strings} from '../../i18n'

class Loading extends React.Component {

    componentDidMount = async () => {

        // reset which screen to show for group screen (set group list)
        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'GroupList' }
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

        //*
        // Listener for notifications when app is in foreground
        // When new notification received, displays it
        //*
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

        //*
        // Listener for data message only
        //*
        this.messageListener = firebase.messaging().onMessage((message) => {
            // If FCM data.type is group photo updated
            // Calls GROUP_PHOTO_UPDATED reducer
            if (message.data.type === 'GROUP_PHOTO_UPDATED') {
                const groupName = message.data.groupName
                const dlURL = message.data.URL
                const PhotoName = message.data.PhotoName
                const group_photo_updated = {
                    type: 'GROUP_PHOTO_UPDATED',
                    value: { groupName, dlURL, PhotoName }
                }
                this.props.dispatch(group_photo_updated)
            } else if (message.data.type === 'NEW_PRIVATE_GROUP_CONTACT') {
                // data from message
                const contactName = message.data.contactName
                const groupName = message.data.groupName
        
                // checking if group already exists in Store
                const currentStore = Store.getState()
                const groupList = currentStore.groupManagment.groupList
                const groupNameIndex = groupList.findIndex(item =>
                    item.name === groupName)
        
                // if group does exists
                // Reducer - Adding contact
                if (groupNameIndex !== -1) {
                    const action = {
                        type: 'NEW_PRIVATE_GROUP_CONTACT',
                        value: { contactName, groupName }
                    }
                    this.props.dispatch(action)
                    // group does not exists
                } else {
                    // grabs group information from firestore
                    // add group and existings contacts
                    firebase
                    .firestore()
                    .collection('Private_Groups')
                    .doc(groupName)
                    .get()
                    .then(doc => {
                        // Group informations
                        creator = doc.get('creator')
                        photoURL = doc.get('photoURL')
                        // Contact list
                        let contacts = []
                        let newId = 1
                        firebase
                            .firestore()
                            .collection('Private_Groups')
                            .doc(groupName)
                            .collection('Members')
                            .get()
                            .then(members => {
                                members.forEach(doc => {
                                    const member = doc.data().name
                                    let contactId = newId
                                    const contact = { name: member, id: contactId }
                                    contacts.push(contact)
                                    newId++
                                })
                                const action = {
                                    type: 'ADD_PRIVATE_GROUP',
                                    value: { creator, photoURL, groupName, contacts }
                                }
                                this.props.dispatch(action)
                            })
                    })
                }
            } else {
                const messageId = message.data.messageId
                const contact = message.data.contact
                const predefined_message = message.data.predefined_message
                const additional_message = message.data.additional_message
                const timeStamp = Number(message.data.timeStamp)
                const messageStatus = message.data.type
                const action_FCM_onMessage = {
                    type: 'MESSAGE_RECEIVED_FROM_FCM',
                    value: { messageId, contact, predefined_message, additional_message, timeStamp, messageStatus }
                }
                this.props.dispatch(action_FCM_onMessage)
            }
        })
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
                strings('loading.error_title'),
                strings('loading.error_message')
                [
                {
                    text: strings('loading.close_button_1'), onPress: () => this.requestingPermission()
                },
                {
                    text: strings('loading.close_button_2'), onPress: () => this.goToMainScreen(user)
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
        console.log('TEST TEST TEST TEST')
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