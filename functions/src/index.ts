import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

export const sendPushNotificationsForNewMessages =
    functions.firestore
        .document(`Users/{user}/messagesReceived/{message}`)
        .onCreate(async (snapshot, context) => {
            const data = snapshot.data()
            const payload = {
                notification: {
                    title: data.title,
                    body: data.body,
                    sound: data.sound,
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





/*export const helloWorld = functions.https.onRequest((request, response) => {
    console.log('hello world')
    response.send("Hello from Firebase!");
});*/
