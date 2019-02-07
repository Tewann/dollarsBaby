"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
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
exports.messageSendToGroup = functions.https.onCall(data => {
    const body = data.additionalMessage === "" ? `${data.predefined_message}` : `${data.predefined_message} : ${data.additionalMessage}`;
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
        return { message: 'success' };
    })
        .catch(err => {
        console.log("'MessageSendToGroup' function error : ", err);
        return err;
    });
});
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
exports.deleteAllUserHistory = functions
    .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
})
    .https.onCall((data, context) => {
    const user = data.user;
    const collectionRef = admin.firestore()
        .collection('Users')
        .doc(user)
        .collection('messagesReceived');
    const query = collectionRef.orderBy('title').limit(3);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve, reject);
    });
});
function deleteQueryBatch(query, resolve, reject) {
    query.get()
        .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
            return 0;
        }
        // Delete documents in a batch
        const batch = admin.firestore().batch();
        snapshot.docs.forEach((doc) => {
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
exports.addPublicGroupMessageToAllMembers = functions.firestore
    .document(`Public_Groups/{groups}/Messages/{messages}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const parent = snapshot
        .ref
        .parent
        .parent
        .collection('Members');
    const contactList = yield parent.get().then(snapshotMembers => {
        const contacts = [];
        snapshotMembers.forEach(doc => {
            const contactName = doc.data().name;
            contacts.push(contactName);
        });
        return contacts;
    });
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
            .then(() => {
            snapshot.ref.delete()
                .then()
                .catch(err => console.log('error : ', err));
        })
            .catch(err => console.log('error : ', err));
    });
    return;
}));
// -------------------------------
//          PRIVATE GROUPS
// -------------------------------
//*
// When a message is added to a private group 
// Add message to the message list of each contact of the group
//*
exports.addPrivateGroupMessageToAllMembers = functions.firestore
    .document(`Private_Groups/{groups}/Messages/{messages}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    /*  console.log()
     console.log(snapshot.ref.parent.get()) */
    const data = snapshot.data();
    const parent = snapshot
        .ref
        .parent
        .parent
        .collection('Members');
    const contactList = yield parent.get().then(snapshotMembers => {
        const contacts = [];
        snapshotMembers.forEach(doc => {
            const contactName = doc.data().name;
            contacts.push(contactName);
        });
        return contacts;
    });
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
            .then(() => {
            snapshot.ref.delete()
                .then()
                .catch(err => console.log('error : ', err));
        })
            .catch(err => console.log('error : ', err));
    });
    return;
}));
// -------------------------------
//          USERS
// -------------------------------
exports.sendPushNotificationsForNewMessages = functions.firestore
    .document(`Users/{user}/messagesReceived/{message}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    // User database reference
    const parent = snapshot.ref.parent.parent;
    // User's token for cloud messaging
    const fcmToken = yield parent.get().then(doc => {
        const Token = doc.data().fcmToken;
        return Token;
    });
    // User platform (Android / iOS)
    const userPlatform = yield parent.get().then(doc => {
        const platform = doc.data().userPlatform;
        return platform;
    });
    // Building message
    // Message data
    const data = snapshot.data();
    // Name or nickname eventually
    let contactName;
    if (data.sendBy !== undefined) {
        // Sendby is for groups messages
        contactName = `${data.sendBy} @ ${data.title}`;
    }
    else {
        contactName = yield parent.collection('contactList')
            .where('name', "==", data.title)
            .get()
            .then(doc => {
            if (doc) {
                const contactNameOrNickname = doc.docs[0].data().nickname !== undefined || null ? doc.docs[0].data().nickname : data.title;
                return contactNameOrNickname;
            }
            else {
                return;
            }
        });
    }
    // Predefined message (sended as data in case notification sound is not received)
    const predefined_message = data.predefined_message === null || undefined ? 'Blink' : data.predefined_message;
    // Payload
    let payload = null;
    // If Platorm is Android, builds Android payload
    if (userPlatform === 'android') {
        const notifSound = yield setNotificationSound(data.sound, 'android', parent);
        const androidSound = data.sound + '.wav';
        payload = {
            notification: {
                title: contactName,
                body: data.body,
                sound: notifSound,
                // Android channel id necessary for > 26 (OREO 8.0 +)
                android_channel_id: notifSound,
                tag: '1'
            },
            data: {
                predefined_message: predefined_message,
                contactName: contactName
            },
        };
    }
    else {
        // If platform is iOS
        const iOSSound = data.sound + '.aiff';
        payload = {
            notification: {
                title: contactName,
                body: data.body,
                sound: iOSSound
            },
            data: {
                predefined_message: predefined_message,
            },
        };
    }
    // sends notification to user's phone
    return admin.messaging().sendToDevice(fcmToken, payload)
        .then()
        .catch((error) => {
        console.log('Error sending message', error);
    });
}));
function setNotificationSound(sound, platform, userRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const predefindSoundsList = [
            's1blink',
            's2tesou',
            's3urgent',
            's4oubliepas',
            's5jarrive',
            's6cestfait'
        ];
        let soundToReturn = null;
        const defaultSound = platform === 'android' ? 's1blink.wav' : 's1blink.aiff';
        // If the notification sounds is one of the predefined return the sound  with the correct extension for the platform
        if (predefindSoundsList.includes(sound)) {
            const soundToPlatform = platform === 'android' ? sound + '.wav' : sound + '.aiff';
            soundToReturn = soundToPlatform;
        }
        else {
            // Verifies that the custom sound has been downloaded by the user
            yield userRef.collection('SoundsDownloaded')
                .doc(sound)
                .get()
                .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const customSound = platform === 'android' ? sound : sound + 'wav';
                    // If the sound name is a doc name in the downloaded sound collection of the user
                    // Return the sound so it can be played
                    soundToReturn = customSound;
                }
                else {
                    // The sound has not been downloaded by the user yet
                    // Return the sound as s1blink
                    soundToReturn = defaultSound;
                }
            })
                .catch(err => console.log(err));
        }
        return soundToReturn;
    });
}
//# sourceMappingURL=index.js.map