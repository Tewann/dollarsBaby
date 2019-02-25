// src/Components/LoadingScreenComponents/Loading.js
// Loading Screen

import React from 'react'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { fetchContacts, fetchMessages, fetchGroups, setUpRegistrationTokenToFirebase, getUserDataForLoginScreen } from '../../Services/firebaseFunctions'
import { strings } from '../../i18n'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'
import { setUpSoundsForAndroid } from '../../Services/setUpCustomDownloadedSounds'

class Loading extends React.Component {
    componentDidMount = async () => {
        //const resetTOS = { type: 'RESET_TOS'}
        //this.props.dispatch(resetTOS)
        //const resetContacts = { type: 'RESET_CONTACT'}
        //this.props.dispatch(resetContacts)
        //const resetCurrentUser = { type: 'RESET_USER'}
        //this.props.dispatch(resetCurrentUser)
        //const resetMessageHistory = { type: 'RESET_MESSAGE_HISTORY' }
        //this.props.dispatch(resetMessageHistory)
        //const resetGroups = { type: 'RESET_GROUP_LIST'}
        //this.props.dispatch(resetGroups)
        //const resetSounds = { type: 'RESET_SOUNDS'}
        //this.props.dispatch(resetSounds)
        //const resetOptions = { type: 'RESET_OPTIONS' }
        //this.props.dispatch(resetOptions)
        /**
         * On launch, sets both contact and group screens to default values (lists)
         * Calls reducer to :
         *  => reset currentDisplayedGroup value to GroupList,
         *  => reset currentDisplayedContact value to ContactsList
         */
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }

        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'GroupList' }
        this.props.dispatch(action)
        const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
        this.props.dispatch(contactScreenToList)
        const displaysAdsAction = { type: 'AD_BANNER', value: { value: true, event: 'reset' } }
        this.props.dispatch(displaysAdsAction)

        this._checkCurrentAppVersion()

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // user is authentificated
                const username = user.displayName
                const checkingPermission = await this.checkingNotificationsPermissions(user)
                const checkingCurrentToken = await this.checkingCurrentRegistrationToken(username)
                if (user.displayName != this.props.currentUser.name) {
                    const userInformations = await getUserDataForLoginScreen()
                    const action = { type: "SET_CURRENT_USER_NAME", value: userInformations.userName }
                    this.props.dispatch(action)
                    const action2 = { type: "SET_CURRENT_USER_EMAIL", value: userInformations.userEmail }
                    this.props.dispatch(action2)
                }
                this.goToMainScreen(user)
            } else {
                // there no user connected
                // going to login screen
                this.props.navigation.navigate('Login')
                SplashScreen.hide();
            }
        })


        if (this.props.currentUser.name === null) {
            const userInformations = await getUserDataForLoginScreen()
            const action = { type: "SET_CURRENT_USER_NAME", value: userInformations.userName }
            this.props.dispatch(action)
            const action2 = { type: "SET_CURRENT_USER_EMAIL", value: userInformations.userEmail }
            this.props.dispatch(action2)
        }

        //*
        // Create android notification channels
        // One channel for each sound
        //*
        if (Platform.OS === 'android') {
            // Checks customs sounds from the contacts and groups of the user and create the channels if not done already
            setUpSoundsForAndroid(this.props.currentUser.name)

            // Blink channel
            const s1blink = new firebase.notifications.Android.Channel('s1blink', 'Blink Sound Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('Blink Sound Channel')
                .setSound('s1blink.wav');
            firebase.notifications().android.createChannel(s1blink);

            // Where channel
            const s2tesou = new firebase.notifications.Android.Channel('s2tesou', 'Where Sound Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('Where Sound Channel')
                .setSound('s2tesou.wav');
            firebase.notifications().android.createChannel(s2tesou);

            // Urgent channel
            const s3urgent = new firebase.notifications.Android.Channel('s3urgent', 'Urgent Sound Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('Urgent Sound Channel')
                .setSound('s3urgent.wav');
            firebase.notifications().android.createChannel(s3urgent);

            // Don't forget channel
            const s4oubliepas = new firebase.notifications.Android.Channel('s4oubliepas', "Don't forget Sound Channel", firebase.notifications.Android.Importance.Max)
                .setDescription("Don't forget Sound Channel")
                .setSound('s4oubliepas.wav');
            firebase.notifications().android.createChannel(s4oubliepas);

            // Coming channel
            const s5jarrive = new firebase.notifications.Android.Channel('s5jarrive', "I'm comming Sound Channel", firebase.notifications.Android.Importance.Max)
                .setDescription("I'm comming Sound Channel")
                .setSound('s5jarrive.wav');
            firebase.notifications().android.createChannel(s5jarrive);

            // Done channel
            const s6cestfait = new firebase.notifications.Android.Channel('s6cestfait', "Done Sound Channel", firebase.notifications.Android.Importance.Max)
                .setDescription("Done Sound Channel")
                .setSound('s6cestfait.wav');
            firebase.notifications().android.createChannel(s6cestfait);
        }

        /**
         * DEALS WITH NOTIFICATION CLICKED WHEN APP IN FOREGROUND OR BACKGORUND
         * Notification cliked / tapped / opened when app in foreground or background
         */
        firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            // const action = notificationOpen.action;
            // Get information about the notification that was opened
            //const notification = notificationOpen.notification;
            const notificationTitle = notificationOpen.notification.title || notificationOpen.notification.data.contactName
            let contactName = notificationTitle
            let groupName = notificationTitle.split(" @ ")[1]
            const contactIndex = this.props.contactList.findIndex(item => item.name == notificationTitle)
            const groupIndex = this.props.groupList.findIndex(item => item.displayName == groupName)
            if (contactName == undefined || null) {
                const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
                this.props.dispatch(contactScreenToList)
                this.props.navigation.navigate('Mainscreen')
            } else if (contactIndex !== -1) {
                const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: contactName }
                this.props.dispatch(contactScreenToList)
                this.props.navigation.navigate('ContactScreen')
            } else if (groupIndex !== -1) {
                /*                 const action = {
                                    type: 'SWITCH_GROUP_SCREEN',
                                    value: {
                                        groupName: this.props.groupList[groupIndex].displayName,
                                        groupType: this.props.groupList[groupIndex].type,
                                        groupNameIndex: groupIndex
                                    }
                                }
                                this.props.dispatch(action)
                                this.props.navigation.navigate('GroupScreen') */
                this.props.navigation.navigate('GroupsList')
            } else if (contactIndex === -1) {
                const nicknameIndex = this.props.contactList.findIndex(item => String(item.nickname) == notificationTitle)
                contactName = this.props.contactList[nicknameIndex].name
                const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: contactName }
                this.props.dispatch(contactScreenToList)
                this.props.navigation.navigate('ContactScreen')
            } else {
                this.props.navigation.navigate('MessageHistory')
            }
        });

        /**
         * DEALS WITH NOTIFICATION CLICKED WHEN APP IS CLOSED
         * Notification cliked / tapped / opened when app is closed
         */
        firebase.notifications().getInitialNotification()
            .then((notificationOpen) => {
                if (notificationOpen) {
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    //const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    //const notification = notificationOpen.notification;
                    const notificationTitle = notificationOpen.notification.title || notificationOpen.notification.data.contactName
                    let contactName = notificationTitle
                    const contactIndex = this.props.contactList.findIndex(item => item.name == notificationTitle)
                    let groupName = notificationTitle.split(" @ ")[1]
                    const groupIndex = this.props.groupList.findIndex(item => item.displayName == groupName)

                    if (contactName == undefined || null) {
                        const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
                        this.props.dispatch(contactScreenToList)
                        this.props.navigation.navigate('Mainscreen')
                    } else if (contactIndex !== -1) {
                        const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: contactName }
                        this.props.dispatch(contactScreenToList)
                        this.props.navigation.navigate('ContactScreen')
                    } else if (groupIndex !== -1) {
                        /*                 const action = {
                                            type: 'SWITCH_GROUP_SCREEN',
                                            value: {
                                                groupName: this.props.groupList[groupIndex].displayName,
                                                groupType: this.props.groupList[groupIndex].type,
                                                groupNameIndex: groupIndex
                                            }
                                        }
                                        this.props.dispatch(action)
                                        this.props.navigation.navigate('GroupScreen') */
                        this.props.navigation.navigate('GroupsList')
                    } else if (contactIndex === -1) {
                        const nicknameIndex = this.props.contactList.findIndex(item => item.nickname == notificationTitle)
                        contactName = this.props.contactList[nicknameIndex].name
                        const contactScreenToList = { type: 'SWITCH_CONTACT_SCREEN', value: contactName }
                        this.props.dispatch(contactScreenToList)
                        this.props.navigation.navigate('ContactScreen')
                    } else {
                        this.props.navigation.navigate('MessageHistory')
                    }
                }
            });


        //*
        // DISPLAYS NOTIFICATION WHEN APP IN FOREGROUND
        // Listener for notifications when app is in foreground
        // When new notification received, displays it
        // Deals with notification sound not correctly received
        //*
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // if notification sound is null or undefined
            if (notification.sound === null || notification.sound === undefined) {
                // if platform === iOS
                if (Platform.OS === 'ios') {
                    // grabs notification sound from reducer
                    const predefinedMessageIndex = this.props.predefined_message_list.findIndex(item =>
                        item.title === notification.data.predefined_message)
                    // if notification.title is not in predefined message list : set 's1blink' sound
                    const sound = predefinedMessageIndex !== -1 ? this.props.predefined_message_list[predefinedMessageIndex].sound : 's1blink'
                    const iOSSound = sound + '.aiff'

                    // Process notification
                    const notif = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setBody(notification.body)
                        .setSound(iOSSound)

                    // display notification
                    firebase.notifications().displayNotification(notif)

                    // if platform === android
                } else {
                    const predefinedMessageIndex = this.props.predefined_message_list.findIndex(item =>
                        item.title === notification.title)
                    // if notification.title is not in predefined message list : set 's1blink' sound
                    const sound = predefinedMessageIndex !== -1 ? this.props.predefined_message_list[predefinedMessageIndex].sound : 's1blink'
                    const androidSound = sound + '.wav'

                    // Process notification
                    const notif = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setBody(notification.body)
                        .setSound(androidSound)
                    notif.android.setChannelId('s1blink')
                    notif.android.setAutoCancel(true);

                    // display notification
                    firebase.notifications().displayNotification(notif)
                }
                // if notification sound is correctly received
            } else {
                let notif
                if (Platform.OS === 'android') {
                    // Set sound depending on the sound type (custom or predefined)
                    let notificationSound = notification.sound
                    // Checks if sound is already in the current redux state
                    const existsInCurrentReduxState = this.props.currentSoundsSetUp.some((element) => {
                        return element.sound === notification.sound
                    })

                    if (existsInCurrentReduxState) {
                        const soundObject = this.props.currentSoundsSetUp.find(element => {
                            return element.sound === notification.sound
                        })
                        notificationSound = soundObject.downloadUrl
                    }
                    // Create notification
                    notif = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setBody(notification.body)
                        .setSound(notificationSound)

                    // Set channel for android > 26
                    notif.android.setChannelId(notification.sound)
                    notif.android.setAutoCancel(true)
                    /* .android.setGroup('1')
                    .android.setTag('1')
                    .android.setGroupSummary(false)
*/
                } else {
                    // Create notification
                    notif = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setBody(notification.body)
                        .setSound(notification.sound)
                }

                // Display notification
                firebase.notifications().displayNotification(notif)
            }
        });

        //*
        // Listener for data message only
        //*
        /*
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
        */
    }

    goToMainScreen(user) {
        // Checks if Terms of service have been accepted
        // If no : navigates to Screen
        if (this.props.currentUser.termsOfServiceStatus === 'declined') {
            this.props.navigation.navigate('TermsOfService')
        } else if (user.displayName === null) {
            // deals with user is null error
            // (example : app crashes when setting display name)
            this.props.navigation.navigate('GetDisplayName')
        } else {
            // navigate to main screen and start listening to database
            this.props.dispatch(fetchContacts(user.displayName))
            this.props.dispatch(fetchMessages(this.props.currentUser.name))
            this.props.dispatch(fetchGroups(this.props.currentUser.name))
            //this.props.navigation.navigate('AddContactScreen')
             this.props.navigation.navigate('MessageHistory')
           // this.props.navigation.navigate('GroupsList')
            // this.props.navigation.navigate('DrawerStack')
/*                                      const groupNameIndex = this.props.groupList.findIndex(item =>
                                       item.displayName === "Hge" && item.type === "private")
                                   const action = {
                                       type: 'SWITCH_GROUP_SCREEN',
                                       value: {
                                           groupName: "Hge",
                                           groupType: "private",
                                           groupNameIndex: groupNameIndex
                                       }
                                   }
                                   this.props.dispatch(action)
                                   this.props.navigation.navigate('GroupScreen')   */
                  /*            const action = { type: 'SWITCH_CONTACT_SCREEN', value: 'God' }
                     this.props.dispatch(action)
                     this.props.navigation.navigate('ContactScreen')   */  
        }
    }

    checkingNotificationsPermissions = async (user) => {
        // checking if user has granted permission for notifications
        const enabled = await firebase.messaging().hasPermission()
        if (enabled || this.props.currentUser.notificationspermissionsdeclined == true) {
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
                strings('loading.error_message'),
                [
                    {
                        text: strings('loading.close_button_1'), onPress: () => this.requestingPermission()
                    },
                    {
                        text: strings('loading.close_button_2'), onPress: () => {
                            // calls reducers, current user permissions declined -> true
                            const permissionsdeclinedaction = { type: 'NOTIFICATIONS_DECLINED' }
                            this.props.dispatch(permissionsdeclinedaction)
                            this.goToMainScreen(user)
                        }
                    }
                ]
            )

        }
    }

    checkingCurrentRegistrationToken = async (username) => {
        if (this.props.currentUser.name != null) {
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
    }

    _checkCurrentAppVersion = () => {
        const currentVersion = this.props.currentUser.appVersion
        if (currentVersion == undefined || currentVersion == null) {
            console.log('uptading version')
            const appversionresetuserpicture = { type: 'UPDATE_PROFIL_PICTURE', value: null }
            this.props.dispatch(appversionresetuserpicture)
            const appversionresetContacts = { type: 'RESET_CONTACT' }
            this.props.dispatch(appversionresetContacts)
            const appversionresetMessageHistory = { type: 'RESET_MESSAGE_HISTORY' }
            this.props.dispatch(appversionresetMessageHistory)
            const updateVersion = { type: 'UPDATE_VERSION', value: '1.2.0' }
            this.props.dispatch(updateVersion)
        }
    }


    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.container}
                colors={['#88b097', '#07416b']}>
                <ActivityIndicator size="large" color="white" />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
        predefined_message_list: state.displayMessagesList.predefinedMessagesList,
        contactList: state.contactManagment.contactList,
        currentSoundsSetUp: state.soundsDownloadedReducer.soundsDownloaded,
        groupList: state.groupManagment.groupList,
    }
}
export default connect(mapStateToProps)(Loading)
