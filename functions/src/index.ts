import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { user } from 'firebase-functions/lib/providers/auth';


admin.initializeApp()


// -------------------------------
// -------------------------------
//              GROUPS
// -------------------------------
// -------------------------------



// -------------------------------
//              ALL GROUPS
// -------------------------------


//*
// Push message to firestore group collection
//*
export const messageSendToGroup = functions.https.onCall(data => {
    return admin.firestore()
        .collection(data.groupType === 'public' ? 'Public_Groups' : 'Private_Groups')
        .doc(data.groupName)
        .collection('Messages')
        .add({
            groupName: data.groupName,
            sendBy: data.sendBy,
            body: `${data.predefined_message} : ${data.additionalMessage}`,
            timeStamp: data.timeStamp,
            messageId: data.id,
            predefined_message: data.predefined_message,
            additional_message: data.additionalMessage,
            sound: data.sound
        })
        .then(() => {
            return { message: 'success' }
        })
        .catch(err => {
            console.log("'MessageSendToGroup' function error : ", err)
            return err
        })
})

// -------------------------------
//          PUBLICS GROUPS
// -------------------------------

//*
// When a message is added to a public group 
// Add message to the message list of each contact of the group
//*
export const addPublicGroupMessageToAllMembers =
    functions.firestore
        .document(`Public_Groups/{groups}/Messages/{messages}`)
        .onCreate(async (snapshot, context) => {
            const data = snapshot.data()
            const parent = snapshot
                .ref
                .parent
                .parent
                .collection('Members')

            const contactList = await parent.get().then(snapshotMembers => {
                const contacts = []
                snapshotMembers.forEach(doc => {
                    const contactName = doc.data().name
                    contacts.push(contactName)
                })
                return contacts
            })

            contactList.forEach(name => {
                admin.firestore()
                    .collection('Users')
                    .doc(name)
                    .collection('messagesReceived')
                    .add({
                        title: data.groupName,
                        sendBy: data.sendBy,
                        body: data.body,
                        sound: data.sound,
                        timeStamp: data.timeStamp,
                        messageId: data.messageId,
                        predefined_message: data.predefined_message,
                        additional_message: data.additional_message,
                        type: 'received'
                    })
                    .then()
                    .catch(err => console.log('error : ', err))

            })
            return 
        })


// -------------------------------
//          PRIVATE GROUPS
// -------------------------------

//*
// When a message is added to a private group 
// Add message to the message list of each contact of the group
//*
export const addPrivateGroupMessageToAllMembers =
    functions.firestore
        .document(`Private_Groups/{groups}/Messages/{messages}`)
        .onCreate(async (snapshot, context) => {
            const data = snapshot.data()
            const parent = snapshot
                .ref
                .parent
                .parent
                .collection('Members')

            const contactList = await parent.get().then(snapshotMembers => {
                const contacts = []
                snapshotMembers.forEach(doc => {
                    const contactName = doc.data().name
                    contacts.push(contactName)
                })
                return contacts
            })

            contactList.forEach(name => {
                admin.firestore()
                    .collection('Users')
                    .doc(name)
                    .collection('messagesReceived')
                    .add({
                        title: data.groupName,
                        sendBy: data.sendBy,
                        body: data.body,
                        sound: data.sound,
                        timeStamp: data.timeStamp,
                        messageId: data.messageId,
                        predefined_message: data.predefined_message,
                        additional_message: data.additional_message,
                        type: 'received'
                    })
                    .then(() => console.log('indivudal message sended'))
                    .catch(err => console.log('error : ', err))

            })
            return 
        })

// -------------------------------
//          USERS
// -------------------------------

export const sendPushNotificationsForNewMessages =
    functions.firestore
        .document(`Users/{user}/messagesReceived/{message}`)
        .onCreate(async (snapshot, context) => {
            // User database reference
            const parent = snapshot.ref.parent.parent

            // User's token for cloud messaging
            const fcmToken = await parent.get().then(doc => {
                const Token = doc.data().fcmToken
                return Token
            })

            // User platform (Android / iOS)
            const userPlatform = await parent.get().then(doc => {
                const platform = doc.data().userPlatform
                return platform
            })

            // Building message
            // Message data
            const data = snapshot.data()

            // Predefined message (sended as data in case notification sound is not received)
            const predefined_message = data.predefined_message

            // Payload
            let payload = null
            // If Platorm is Android, builds Android payload
            if (userPlatform === 'android') {
                const androidSound = data.sound + '.wav'
                payload = {
                    notification: {
                        title: data.title,
                        body: data.body,
                        sound: androidSound,
                        // Android channel id necessary for > 26 (OREO 8.0 +)
                        android_channel_id: data.sound
                    },
                    data: {
                        predefined_message: predefined_message,
                    },
                }
            } else {
                // If platform is iOS
                const iOSSound = data.sound + '.aiff'
                payload = {
                    notification: {
                        title: data.title,
                        body: data.body,
                        sound: iOSSound
                    },
                    data: {
                        predefined_message: predefined_message,
                    },
                }
            }

            // sends notification to user's phone
            return admin.messaging().sendToDevice(fcmToken, payload)
                .then((response) => {
                    console.log('Successfully sent message', response);
                })
                .catch((error) => {
                    console.log('Error sending message', error)
                })
        })