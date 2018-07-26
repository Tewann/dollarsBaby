import firebase from 'react-native-firebase'
import { Platform } from 'react-native'

// get UserUid/Email from currently signed in user
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
                photoURL: downloadURL,
                photoName: imageName
            }, { merge: true })
            .then(resolve())
            .catch((error) => {
                reject(error)
            })
    })


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

// function exported to ProfilPhoto component (after sign up screen)
// upload image to firebase storage
export const uploadImage = async (uri) => {
    const signIn = await loginToFirebase('as@gmail.com', 'aaaaaa');
    const { userUid, userEmail, userName } = await getUserData();
    const { downloadURL, imageName } = await uploadImageToFirebase(uri, userName);
    const setDlLinkToProfil = await setImgDlLinkToFirebaseAccount(downloadURL);
    const setDlLinkToCloud = await setDlLinkToCloudFirestore(downloadURL, userName, imageName)
}
