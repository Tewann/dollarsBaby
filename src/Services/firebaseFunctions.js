import firebase from 'react-native-firebase'

// get UserUid from currently signed in user
export const getUserUid = async () =>
    new Promise((resolve, reject) => {
        const currentUser = firebase.auth().currentUser
        if (currentUser) {
            userUid = currentUser.uid
            resolve(userUid)
        } else {
            reject('No user currently signed in')
        }
    })


// function exported to SignUp Screen
// get userUid and create a dedicated document in Cloud Firestore
export const signUpAndCreateUserInDatabase = async (email, password) => {
    const signUp = await signUpToFirebase(email, password);
    const userUid = await getUserUid();
    const createUser = await createUserInCloudFirestore(userUid);
}

// create a dedicated document in Cloud Firestore for currently signed in user
export const createUserInCloudFirestore = (userUid) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('Users')
        ref.doc(userUid).set({
            title: 'testing adding user : ' + userUid
        })
        .then(resolve())
        .catch((error) => {
            reject(error)
        })
    })

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
