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
    const body = data.additionalMessage == "" ? `${data.predefined_message}` : `${data.predefined_message} : ${data.additionalMessage}`
    return admin.firestore()
        .collection(data.groupType === 'public' ? 'Public_Groups' : 'Private_Groups')
        .doc(data.groupName)
        .collection('Messages')
        .add({
            groupName: data.groupName,
            sendBy: data.sendBy,
            body: body,
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

/**
 * Initiate a recursive delete of documents at a given path.
 * 
 * The calling user must be authenticated and have the custom "admin" attribute
 * set to true on the auth token.
 * 
 * This delete is NOT an atomic operation and it's possible
 * that it may fail after only deleting some documents.
 * 
 * @param {string} data.path the document or collection path to delete.
 */
export const deleteAllUserHistory = functions
    .runWith({
        timeoutSeconds: 540,
        memory: '2GB'
    })
    .https.onCall((data, context) => {
        var user = data.user
        var collectionRef = admin.firestore()
            .collection('Users')
            .doc(user)
            .collection('messagesReceived')
        var query = collectionRef.orderBy('title').limit(3);

        return new Promise((resolve, reject) => {
            deleteQueryBatch(query, resolve, reject);
        });
    });

function deleteQueryBatch(query, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }

            // Delete documents in a batch
            var batch = admin.firestore().batch();
            snapshot.docs.forEach((doc) => {
                console.log('delete?')
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
            if (numDeleted === 0) {
                resolve();
                return;
            }
            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(query, resolve, reject);
            });
        })
        .catch(reject);
}

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
            const predefined_message = data.predefined_message == null || undefined ? 'Blink' : data.predefined_message

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