import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

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

