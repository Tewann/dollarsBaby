import firebase from 'react-native-firebase'
import RNFetchBlob from 'react-native-fetch-blob'

// get UserUid/Email from currently signed in user
export const getUserUidAndEmail = async () =>
    new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser
        if (user) {
            userUid = user.uid
            userEmail = user.email
            userInformations = { userUid, userEmail }
            resolve(userInformations)
        } else {
            reject('No user currently signed in')
        }
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
                                    Uid: userUid
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
export const loginToFirebase = (email, password) =>
    new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(resolve())
            .catch(error => {
                reject(error)
            })
    })

// upload image
export const uploadImage = (uri, mime = 'aplication/octet-stream') => {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    console.log('test')
    console.log(Blob)
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
    const { userUid, userEmail } = await getUserUidAndEmail();
    const setDisplayName = await setDiplayNameToFirebaseAccount(username);
    const createUser = await createUserInCloudFirestore(username, userUid, userEmail);
}