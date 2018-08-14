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
exports.sendPushNotificationsForNewMessages = functions.firestore
    .document(`Users/{user}/messagesReceived/{message}`)
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const sound = data.sound.toLowerCase() + '.waw';
    const payload = {
        notification: {
            title: data.title,
            body: data.body,
            sound: sound,
        },
    };
    // get ref to the user document
    const parent = snapshot.ref.parent.parent;
    // grabs token for cloud messaging
    const fcmToken = yield parent.get().then(doc => {
        const Token = doc.data().fcmToken;
        return Token;
    });
    // sends notification to user's phone
    return admin.messaging().sendToDevice(fcmToken, payload);
}));
//# sourceMappingURL=index.js.map