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
        return { message: 'success' };
    })
        .catch(err => {
        console.log(err);
        return err;
    });
});
// -------------------------------
//          PUBLICS GROUPS
// -------------------------------
//*
// When a group messages onCreate for public groups
// Send notification to all group contacts
//*
exports.sendPushNotificationsForNewGroupMessages = functions.firestore
    .document(`Public_Groups/{groups}/Messages/{messages}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const sound = data.sound.toLowerCase() + '.waw';
    const payload = {
        notification: {
            title: data.groupName,
            body: data.body,
            sound: sound
        },
    };
    const parent = snapshot
        .ref
        .parent
        .parent
        .collection('Members');
    const fcmTokens = yield parent.get().then(snapshotMembers => {
        const tokens = [];
        snapshotMembers.forEach(doc => {
            const token = doc.data().token;
            tokens.push(token);
        });
        return tokens;
    });
    return admin.messaging().sendToDevice(fcmTokens, payload);
}));
//*
// When a group PhotoUrl has been updated 
// Send data to all contacts
//*
exports.sendPushDataMessageForGroupPhotoURLUpdated = functions.firestore
    .document(`Public_Groups/{groups}`)
    .onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    const newValue = change.after.data();
    const newURL = newValue.photoURL;
    const newPhotoName = newValue.photoName;
    const groupName = newValue.GroupName;
    const message = {
        data: {
            type: 'GROUP_PHOTO_UPDATED',
            groupName: groupName,
            URL: newURL,
            PhotoName: newPhotoName,
        },
    };
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        'content-available': true
    };
    const Members = yield admin.firestore()
        .collection('Public_Groups')
        .doc(groupName)
        .collection('Members');
    const fcmTokens = yield Members.get().then(snapshotMembers => {
        const tokens = [];
        snapshotMembers.forEach(doc => {
            const token = doc.data().token;
            tokens.push(token);
        });
        return tokens;
    });
    return admin.messaging().sendToDevice(fcmTokens, message, options);
}));
// -------------------------------
//          PRIVATE GROUPS
// -------------------------------
//*
// When a group messages onCreate for private groups
// Send notification to all group contacts
//*
exports.sendPushNotificationsForNewPrivateGroupMessages = functions.firestore
    .document(`Private_Groups/{groups}/Messages/{messages}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const sound = data.sound.toLowerCase() + '.waw';
    const payload = {
        notification: {
            title: data.groupName,
            body: data.body,
            sound: sound
        },
    };
    const parent = snapshot
        .ref
        .parent
        .parent
        .collection('Members');
    const fcmTokens = yield parent.get().then(snapshotMembers => {
        const tokens = [];
        snapshotMembers.forEach(doc => {
            const token = doc.data().token;
            tokens.push(token);
        });
        return tokens;
    });
    return admin.messaging().sendToDevice(fcmTokens, payload);
}));
//*
// When a private group PhotoUrl has been updated 
// Send data to all contacts
//*
exports.sendPushDataMessageForPrivateGroupPhotoURLUpdated = functions.firestore
    .document(`Private_Groups/{groups}`)
    .onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    const newValue = change.after.data();
    const newURL = newValue.photoURL;
    const newPhotoName = newValue.photoName;
    const groupName = newValue.GroupName;
    const message = {
        data: {
            type: 'GROUP_PHOTO_UPDATED',
            groupName: groupName,
            URL: newURL,
            PhotoName: newPhotoName,
        },
    };
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        'content-available': true
    };
    const Members = yield admin.firestore()
        .collection('Private_Groups')
        .doc(groupName)
        .collection('Members');
    const fcmTokens = yield Members.get().then(snapshotMembers => {
        const tokens = [];
        snapshotMembers.forEach(doc => {
            const token = doc.data().token;
            tokens.push(token);
        });
        return tokens;
    });
    return admin.messaging().sendToDevice(fcmTokens, message, options);
}));
//*
// Contact added to Group
// Send data notification to group users with contact information
//*
exports.sendPushDataMessage_ContactAdded = ((name, members, GroupName) => __awaiter(this, void 0, void 0, function* () {
    const message = {
        data: {
            type: 'NEW_PRIVATE_GROUP_CONTACT',
            contactName: name,
            groupName: GroupName
        },
    };
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        'content-available': true
    };
    const fcmTokens = yield members.get().then(snapshotMembers => {
        const tokens = [];
        snapshotMembers.forEach(doc => {
            const token = doc.data().token;
            tokens.push(token);
        });
        return tokens;
    });
    return admin.messaging().sendToDevice(fcmTokens, message, options);
}));
//*
// When a contact has been added to a private group
// Grabs FCM Token from the 'Users' collection and push it to the private group
//*
exports.addTokenInformationsWhenNewContact = functions.firestore
    .document(`Private_Groups/{groups}/Members/{members}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const name = data.name;
    // Getting token
    const getToken = yield admin.firestore().collection('Users').doc(name).get()
        .then((doc) => {
        const token = doc.data().fcmToken;
        return token;
    })
        .catch((err) => {
        return err;
    });
    const contactDocument = snapshot
        .ref
        .parent
        .parent
        .collection('Members')
        .doc(snapshot.id);
    // Adding token
    const addToken = yield contactDocument.set({
        token: getToken
    }, { merge: true })
        .catch(err => { return err; });
    // Sends data notification to group users
    const members = snapshot
        .ref
        .parent
        .parent
        .collection('Members');
    const GroupName = yield snapshot
        .ref
        .parent
        .parent
        .get()
        .then(doc => {
        const groupName = doc.data().GroupName;
        return groupName;
    })
        .catch(err => console.log(err));
    const sendData = yield exports.sendPushDataMessage_ContactAdded(name, members, GroupName)
        .catch(err => console.log(err));
    return;
}));
// -------------------------------
//          USERS
// -------------------------------
exports.sendPushNotificationsForNewMessages = functions.firestore
    .document(`Users/{user}/messagesReceived/{message}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    // grabs user reference
    const parent = snapshot.ref.parent.parent;
    // grabs user's token for cloud messaging
    const fcmToken = yield parent.get().then(doc => {
        const Token = doc.data().fcmToken;
        return Token;
    });
    // building message
    // data
    const data = snapshot.data();
    // sound
    const androidSound = data.sound + '.wav';
    const iOSSound = data.sound + '.aiff';
    // sends predefined message as data if notification sound is not received
    const predefined_message = data.predefined_message;
    // message
    const message = {
        notification: {
            title: data.title,
            body: data.body,
        },
        data: {
            predefined_message: predefined_message
        },
        apns: {
            payload: {
                aps: {
                    sound: iOSSound
                }
            }
        },
        android: {
            notification: {
                sound: androidSound
            }
        },
        token: fcmToken,
    };
    console.log('notification');
    console.log(message);
    // sends notification to user's phone
    return admin.messaging().send(message);
}));
//# sourceMappingURL=index.js.map