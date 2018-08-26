import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp()

//*
// Push message to firestore
// Send message to all group members
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
            sound: data.predefined_message
        })
        .then(() => {
            return {message: 'success'}
        })
        .catch(err => {
            console.log(err)
            return err
        })
})

export const sendPushNotificationsForNewGroupMessages =
    functions.firestore
        .document(`Public_Groups/{groups}/Messages/{messages}`)
        .onCreate(async (snapshot, context) => {

            const data = snapshot.data()
            const sound = data.sound.toLowerCase() + '.waw'
            const payload = {
                notification: {
                    title: data.groupName,
                    body: data.body,
                    sound: sound
                },
            }
            const parent = snapshot
                .ref
                .parent
                .parent
                .collection('Members')
            const fcmTokens = await parent.get().then(snapshotMembers => {
                const tokens = []
                snapshotMembers.forEach(doc => {
                    const token = doc.data().token
                    tokens.push(token)
                })
                return tokens
            })
            return admin.messaging().sendToDevice(fcmTokens, payload)
        })

export const sendPushNotificationsForNewMessages =
    functions.firestore
        .document(`Users/{user}/messagesReceived/{message}`)
        .onCreate(async (snapshot, context) => {
            const data = snapshot.data()
            const sound = data.sound.toLowerCase() + '.waw'
            const payload = {
                notification: {
                    title: data.title,
                    body: data.body,
                    sound: sound,
                },
                /*android: {
                    notification: {
                        sound: data.sound
                    }
                },
                apns: {
                    payload: {
                        aps: {
                            sound: data.sound
                        }
                    }
                }*/
            }
            // get ref to the user document
            const parent = snapshot.ref.parent.parent
            // grabs token for cloud messaging
            const fcmToken = await parent.get().then(doc => {
                const Token = doc.data().fcmToken
                return Token
            })

            // sends notification to user's phone
            return admin.messaging().sendToDevice(fcmToken, payload)
        })

