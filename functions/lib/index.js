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
        console.log("'MessageSendToGroup' function error : ", err);
        return err;
    });
});
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
            .then()
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
            .then(() => console.log('indivudal message sended'))
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
    // Predefined message (sended as data in case notification sound is not received)
    const predefined_message = data.predefined_message;
    // Payload
    let payload = null;
    // If Platorm is Android, builds Android payload
    if (userPlatform === 'android') {
        const androidSound = data.sound + '.wav';
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
        };
    }
    else {
        // If platform is iOS
        const iOSSound = data.sound + '.aiff';
        payload = {
            notification: {
                title: data.title,
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
        .then((response) => {
        console.log('Successfully sent message', response);
    })
        .catch((error) => {
        console.log('Error sending message', error);
    });
}));
//# sourceMappingURL=index.js.map