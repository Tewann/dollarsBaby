"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.httptest = functions.https.onCall(data => {
    console.log(data);
    if (!data) {
        throw new functions.https.HttpsError('invalid-argument', 'error');
    }
    return { response: 'hello' };
});
//# sourceMappingURL=GroupFunctions.js.map