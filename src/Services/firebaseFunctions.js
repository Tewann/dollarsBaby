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

    // upload image to firebase storage
    export const uploadImageToFirebase = (uri, userName) => {

        return new Promise((resolve, reject) => {
            let imgUri = uri.uri;
            const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
            const sessionId = new Date().getTime()
            firebase
                .storage()
                .ref('Profil Pictures')
                .child(`/${userName}_${sessionId}.jpg`)
                .putFile(uploadUri)
                .then(result => resolve(result.downloadURL))
                .catch(error => reject(console.log('erreur : ', error)))
        })
    }
    
    // set profil image download link into firebase profil
    export const setImgDlLinkToFirebaseAccount = (link) =>
        new Promise((resolve, reject) => {
            const user = firebase.auth().currentUser
            if (user) {
                user.updateProfile({
                    photoURL: link
                })
                    .then(resolve(console.log(user.photoURL)))
                    .catch((error) => {
                        reject(error)
                    })
            } else {
                reject('No user currently signed in')
            }
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
        const uploadImage = await uploadImageToFirebase(uri, userName);
        const setDlLinkToProfil = await setImgDlLinkToFirebaseAccount(uploadImage);
        console.log('end')
    }
