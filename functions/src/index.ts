import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


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
            console.log(err)
            return err
        })
})

// -------------------------------
//          PUBLICS GROUPS
// -------------------------------


//*
// When a group messages onCreate for public groups
// Send notification to all group contacts
//*
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


//*
// When a group PhotoUrl has been updated 
// Send data to all contacts
//*
export const sendPushDataMessageForGroupPhotoURLUpdated =
    functions.firestore
        .document(`Public_Groups/{groups}`)
        .onUpdate(async (change, context) => {

            const newValue = change.after.data()
            const newURL = newValue.photoURL
            const newPhotoName = newValue.photoName
            const groupName = newValue.GroupName

            const message = {
                data: {
                    type: 'GROUP_PHOTO_UPDATED',
                    groupName: groupName,
                    URL: newURL,
                    PhotoName: newPhotoName,
                },
            }
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24,
                'content-available': true
            }
            const Members = await admin.firestore()
                .collection('Public_Groups')
                .doc(groupName)
                .collection('Members')
            const fcmTokens = await Members.get().then(snapshotMembers => {
                const tokens = []
                snapshotMembers.forEach(doc => {
                    const token = doc.data().token
                    tokens.push(token)
                })
                return tokens
            })
            return admin.messaging().sendToDevice(fcmTokens, message, options)
        })



// -------------------------------
//          PRIVATE GROUPS
// -------------------------------

//*
// When a group messages onCreate for private groups
// Send notification to all group contacts
//*
export const sendPushNotificationsForNewPrivateGroupMessages =
    functions.firestore
        .document(`Private_Groups/{groups}/Messages/{messages}`)
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


//*
// When a private group PhotoUrl has been updated 
// Send data to all contacts
//*
export const sendPushDataMessageForPrivateGroupPhotoURLUpdated =
    functions.firestore
        .document(`Private_Groups/{groups}`)
        .onUpdate(async (change, context) => {

            const newValue = change.after.data()
            const newURL = newValue.photoURL
            const newPhotoName = newValue.photoName
            const groupName = newValue.GroupName

            const message = {
                data: {
                    type: 'GROUP_PHOTO_UPDATED',
                    groupName: groupName,
                    URL: newURL,
                    PhotoName: newPhotoName,
                },
            }
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24,
                'content-available': true
            }
            const Members = await admin.firestore()
                .collection('Private_Groups')
                .doc(groupName)
                .collection('Members')
            const fcmTokens = await Members.get().then(snapshotMembers => {
                const tokens = []
                snapshotMembers.forEach(doc => {
                    const token = doc.data().token
                    tokens.push(token)
                })
                return tokens
            })
            return admin.messaging().sendToDevice(fcmTokens, message, options)
        })

//*
// Contact added to Group
// Send data notification to group users with contact information
//*
export const sendPushDataMessage_ContactAdded = (async (name, members, GroupName) => {
    const message = {
        data: {
            type: 'NEW_PRIVATE_GROUP_CONTACT',
            contactName: name,
            groupName: GroupName
        },
    }

    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        'content-available': true
    }

    const fcmTokens = await members.get().then(snapshotMembers => {
        const tokens = []
        snapshotMembers.forEach(doc => {
            const token = doc.data().token
            tokens.push(token)
        })
        return tokens
    })

    return admin.messaging().sendToDevice(fcmTokens, message, options)
})


//*
// When a contact has been added to a private group
// Grabs FCM Token from the 'Users' collection and push it to the private group
//*
export const addTokenInformationsWhenNewContact =
    functions.firestore
        .document(`Private_Groups/{groups}/Members/{members}`)
        .onCreate(async (snapshot, context) => {
            const data = snapshot.data()
            const name = data.name

            // Getting token
            const getToken = await admin.firestore().collection('Users').doc(name).get()
                .then((doc) => {
                    const token = doc.data().fcmToken
                    return token
                })
                .catch((err) => {
                    return err
                })

            const contactDocument = snapshot
                .ref
                .parent
                .parent
                .collection('Members')
                .doc(snapshot.id)

            // Adding token
            const addToken = await contactDocument.set({
                token: getToken
            }, { merge: true })
                .catch(err => { return err })

            // Sends data notification to group users
            const members = snapshot
                .ref
                .parent
                .parent
                .collection('Members')
            const GroupName = await snapshot
                .ref
                .parent
                .parent
                .get()
                .then(doc => {
                    const groupName = doc.data().GroupName
                    return groupName
                })
                .catch(err => console.log(err))

            const sendData = await sendPushDataMessage_ContactAdded(name, members, GroupName)
                .catch(err => console.log(err))
            return
        })


// -------------------------------
//          USERS
// -------------------------------

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