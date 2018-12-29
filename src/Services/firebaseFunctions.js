import firebase from 'react-native-firebase'
import { Platform } from 'react-native'
import Store from '../Store/configureStore'


// --------------------------------
// ---------USER Functions---------
// --------------------------------

// get User informations from currently signed in user
export const getUserData = async () =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userUid = user.uid
                userEmail = user.email
                userName = user.displayName
                userInformations = { userUid, userEmail, userName }
                resolve(userInformations)
            } else {
                reject('No user currently signed in')
            }
        })
    })

// set displayName name to the current user profil
export const setDiplayNameToFirebaseAccount = (userName) =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser
        if (user) {
            user.updateProfile({
                displayName: userName
            })
                .then(resolve())
                .catch((error) => {
                    reject(error)
                })
        } else {
            reject('No user currently signed in')
        }
    })

// create a dedicated document in Cloud Firestore for currently signed in user
export const createUserInCloudFirestore = (username, userUid, userEmail) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('Users')
        // check if user is already set up in data base
        const verifyEmail = ref.where('Email', '==', userEmail).get()
            .then(results => {
                // if user already has a database document set up
                // send error
                if (!results.empty) {
                    reject('Already a user name for this mail adress')
                    // if user doesn't have his doc set up
                } else {
                    const verifyName = ref.doc(username).get()
                        .then(doc => {
                            //if user name available create user's doc
                            if (!doc.exists) {
                                ref.doc(username).set({
                                    UserName: username,
                                    Email: userEmail,
                                    Uid: userUid,
                                    photoURL: null,
                                    photoName: null,
                                })
                                    .then(resolve())
                                    .catch((error) => {
                                        reject(error)
                                    })
                                // if user name already taken return error
                            } else {
                                reject("Nom d'utilisateur déjà pris")
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
            .catch(error => reject(error))
        // check if user name is available

    })



// login to firebase
export const loginToFirebase = async (email, password) =>
    new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(resolve())
            .catch(error => {
                reject(error)
            })
    })

// --------------------------------
// ---------END USER Functions-----
// --------------------------------



// ----------------------
// FUNCTIONS UPLOAD IMAGE
// ----------------------

// upload image to firebase storage
export const uploadImageToFirebase = (uri, userName) => {
    return new Promise((resolve, reject) => {
        let imgUri = uri.uri;
        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const sessionId = new Date().getTime()
        const imageName = `Profil Pictures/${userName}_${sessionId}.jpg`
        // grab photo name from CloudFirebase user profil
        firebase
            .firestore()
            .collection('Users')
            .doc(userName)
            .get()
            .then((doc) => {
                previousPhotoName = doc.get('photoName')
                // if there is a photo name already set
                // delete the previous photo in firebase storage
                if (previousPhotoName !== null) {
                    firebase
                        .storage()
                        .ref(previousPhotoName)
                        .delete()
                        .then()
                        .catch(error => console.log('erreur lors suppression', error))
                }
            })
        // upload new image to firebase storage
        firebase
            .storage()
            .ref(imageName)
            //.child(imageName)
            .putFile(uploadUri)
            .then((result) => {
                const downloadURL = result.downloadURL
                const toResolve = { downloadURL, imageName }
                resolve(toResolve)
            })
            .catch(error => reject(error))
    })
}

// set profil image download link to firebase profil
export const setImgDlLinkToFirebaseAccount = (link) =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser
        if (user) {
            user.updateProfile({
                photoURL: link
            })
                .then(resolve())
                .catch((error) => {
                    reject(error)
                })
        } else {
            reject('No user currently signed in')
        }
    })

// add profil picture download link to cloud firestore
export const setDlLinkToCloudFirestore = (downloadURL, username, imageName) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore()
            .collection('Users')
            .doc(username)
            .set({
                photoUrl: downloadURL,
                photoName: imageName
            }, { merge: true })
            .then(resolve())
            .catch((error) => {
                reject(error)
            })
    })


// ----------------------
// END : FUNCTIONS UPLOAD IMAGE
// ----------------------


// add Registration Token to current user cloud firestore document
export const setUpRegistrationTokenToFirebase = async (fcmToken, username) => {
    new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('Users')
            .doc(username)
            .set({
                fcmToken: fcmToken
            }, { merge: true })
            .then(resolve())
            .catch(error => reject(error))
    })
}

//*
// Check/Add current platform used (ios/Android) to the user database profil
// Used at logging and account created
// - userName from getUserData()
//*

export const setPlatformUsedToFirestore = async (userName) => {
    new Promise((resolve, reject) => {
        const userPlatform = Platform.OS === 'android' ? 'android' : 'ios'
        firebase.firestore()
            .collection('Users')
            .doc(userName)
            .set({
                userPlatform: userPlatform
            }, { merge: true })
            .then(() => {
                resolve()
            })
            .catch(err => reject(err))
    })
}

// send message to the contact's firestore message list
export const sendMessageToFirestore = async (currentUser, contact, predefined_message, additionalMessage, timeStamp, id, type, sound) => {
    new Promise((resolve, reject) => {
        // if there is no additionnal message body = predefined message
        // elif only additionnal message body = additionnal message
        // else body = predefined message : additionnal message
        let body = null
        if (additionalMessage == "") {
            body = `${predefined_message}`
        } else if (predefined_message == null || undefined) {
            body = `${additionalMessage}`
        } else {
            body = `${predefined_message} : ${additionalMessage}`
        }
        firebase.firestore()
            .collection('Users')
            .doc(contact)
            .collection('messagesReceived')
            .add({
                title: currentUser,
                body: body,
                sound: sound,
                timeStamp: timeStamp,
                messageId: id,
                predefined_message: predefined_message,
                additional_message: additionalMessage,
                type: type
            })
            .then(resolve())
            .catch(error => reject(error))
    })
}


// Checks if contact exists in firestore
export const doesContactExists = async (contact) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection('Users').doc(contact).get()
            .then(doc => {
                if (doc.exists) {
                    resolve()
                } else {
                    reject("Cet utilisateur n'existe pas")
                }
            })
            .catch(err => reject(err))
    })
}



// --------------------
// --------------------
//  COMPOSITES FUNCTIONS EXPORTED TO COMPONENTS
// --------------------
// --------------------



// function exported to Sign up screen
// sign Up to Firebase
export const signUpToFirebase = (email, password) =>
    new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve('User signup'))
            .catch(error => {
                reject(error.toString())
            })
    })

// function exported to Account Name screen
// set display name to firebase account
// create dedicated document in Cloud Firestore
// using account name
export const createUserInDatabase = async (username) => {
    const { userUid, userEmail, userName } = await getUserData();
    const setDisplayName = await setDiplayNameToFirebaseAccount(username);
    const createUser = await createUserInCloudFirestore(username, userUid, userEmail);
}

//*
// Check/Add current platform used (ios/Android) to the user database profil
// Used at logging and account created
// - userName from getUserData()
//*
export const setPlatformUsed = async () => {
    const { userUid, userEmail, userName } = await getUserData();
    const setPlatform = await setPlatformUsedToFirestore(userName);
}

// function exported to ProfilPhoto component (after sign up screen)
// function exported to ProfilScreen
// upload image to firebase storage
export const uploadImage = async (uri) => {
    //const signIn = await loginToFirebase();
    const { userUid, userEmail, userName } = await getUserData();
    const { downloadURL, imageName } = await uploadImageToFirebase(uri, userName);
    const setDlLinkToProfil = await setImgDlLinkToFirebaseAccount(downloadURL);
    const setDlLinkToCloud = await setDlLinkToCloudFirestore(downloadURL, userName, imageName)
    return downloadURL
}


// function exported to profil screen
// grab user data
export const getUserDataForLoginScreen = async () => {
    //const signIn = await loginToFirebase();
    const { userUid, userEmail, userName } = await getUserData();
    return ({ userEmail, userName })
}

//function exported to AcceptOrDecline
// (component for message history)
export const addContactToFirestore = async (currentUser, contactToAdd) => {

    // add contact to current user contact list in database
    new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('Users')
            .doc(currentUser)
            .collection('contactList')
            .add({
                name: contactToAdd
            })
            .then(resolve())
            .catch(error => reject(error))
    })

    // add contact current user in the new contact contactList
    new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('Users')
            .doc(contactToAdd)
            .collection('contactList')
            .add({
                name: currentUser
            })
            .then(resolve())
            .catch(error => reject(error))
    })
}

// --------------------
// --------------------
//  CLEAN MESSAGE HISTORY
// --------------------
// --------------------

//*
// Cleaning message history
//*
export const cleaningMessageHistory = async () => {
    new Promise((resolve, reject) => {
        const user = Store.getState().getCurrentUserInformations.name
        const httpsCallable = firebase.functions().httpsCallable('deleteAllUserHistory')
        httpsCallable({
            user: user
        })
            .then((res) => {
                // after function called
                // updated redux store
                console.log('succes')
                const action = {
                    type: 'RESET_MESSAGE_HISTORY',
                }
                Store.dispatch(action)
                resolve('success')

            })
            .catch(httpsError => {
                console.log('httpsCallable err' + httpsError)
                const action = {
                    type: 'RESET_MESSAGE_HISTORY',
                }
                Store.dispatch(action)
                console.log('error when executing cleaningMessageHistory, err : ', httpsError)
                reject('error when deleting', httpsError)
            })
    })
}

// --------------------
// --------------------
//  FIREBASE THUNKS
// --------------------
// --------------------

// fetch contacts
export const fetchContacts = (userName) => {
    return function (dispatch) {
        const userPath = userName.toString()
        firebase.firestore()
            .collection('Users')
            .doc(userPath)
            .collection('contactList')
            .onSnapshot((snapshot) => {
                snapshot.forEach(doc => {
                    firebase.firestore()
                        .collection('Users')
                        .doc(doc.get('name'))
                        .onSnapshot((doc) => {
                            const action = { type: 'CONTACT_LIST_UPDATED', value: doc }
                            dispatch(action)
                        })

                    // grabbing eventual nickname
                    const ref = firebase.firestore().collection('Users').doc(userPath).collection('contactList')
                    const contactName = doc.get('name')
                    ref.where('name', "==", contactName)
                        .get()
                        .then((doc) => {
                            const contactNickname = doc.docs[0]._data.nickname != undefined || null ? doc.docs[0]._data.nickname : null
                            if (contactNickname != null) {
                                const action = { type: 'MODIFY_CONTACT_NICKNAME', value: [contactName, contactNickname] }
                                dispatch(action)
                            }
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            })
    }
}

// fetch messages
export const fetchMessages = (userName) => {
    return function (dispatch) {
        const userPath = userName.toString()
        firebase.firestore()
            .collection('Users')
            .doc(userPath)
            .collection('messagesReceived')
            .onSnapshot((snapshot) => {
                snapshot.forEach(doc => {
                    const action = { type: 'MESSAGE_RECEIVED', value: doc }
                    dispatch(action)
                })
            })
    }
}

// fetch groups
export const fetchGroups = (userName) => {
    return function (dispatch) {
        const userPath = userName.toString()
        firebase.firestore()
            .collection('Users')
            .doc(userPath)
            .collection('Groups')
            .onSnapshot((snapshot) => {
                snapshot.forEach(doc => {
                    const groupType = doc.get('type') == 'public' ? 'Public_Groups' : 'Private_Groups'
                    firebase.firestore()
                        .collection(groupType)
                        .doc(doc.get('name'))
                        .onSnapshot((doc) => {
                            const actionType = doc.get('type') == 'public' ? 'PUBLIC_GROUP_UPDATE' : 'PRIVATE_GROUP_UPDATE'
                            const action = { type: actionType, value: doc }
                            dispatch(action)
                        })
                })
            })
    }
}

// -----------------------------
// -----------------------------
//  ADD/MODIFY CONTACT NICKNAME
// -----------------------------
// -----------------------------

export const modifyNicknameToDatabase = async (currentUser, contactToModify, nickname) => {
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('Users').doc(currentUser).collection('contactList')
        ref.where('name', "==", contactToModify)
            .get()
            .then((doc) => {
                const contactDocumentName = doc.docs[0].ref._documentPath._parts[3]
                ref.doc(contactDocumentName)
                    .set({
                        nickname: nickname
                    }, { merge: true })
                    .then(resolve())
            })
            .catch(error => {
                reject(error)
            })
    })
}