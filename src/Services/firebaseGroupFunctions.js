import firebase from 'react-native-firebase'
import { Platform } from 'react-native'

// create public group in Firestore
export const createPublicGroupInFirestore = (groupName, username) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('Public_Groups')
        // create group
        const createGroup = ref.doc(groupName).get()
            .then(doc => {
                //if group name available create group's doc
                if (!doc.exists) {
                    ref.doc(groupName).set({
                        GroupName: groupName,
                        type: 'public',
                        creator: username,
                        photoURL: null,
                        photoName: null,
                    })
                        .then(resolve())
                        .catch((error) => {
                            reject(error)
                        })
                    // if user name already taken return error
                } else {
                    reject("Group name taken")
                }
            })
            .catch(error => {
                reject(error)
            })
    })

export const joinPublicGroupInFirestore = (groupName, username, token) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore().collection('Public_Groups')
        // joining group
        const joinGroup = ref.doc(groupName).collection('Members').where('name', '==', username).get()
            .then(results => {
                // if user already in group, 
                // reject error
                if (!results.empty) {
                    reject('User already in group')
                } else {
                    // if user not in group
                    // add user
                    ref.doc(groupName).collection('Members').add({
                        name: username,
                        token: token
                    })
                        .then(() => {
                            // grab group Creator and Photo Url and returns it
                            ref.doc(groupName).get()
                                .then(res => {
                                    creator = res.data().creator
                                    photoURL = res.data().photoURL

                                    resolve(creator, photoURL)
                                })
                                .catch(err => reject(err))
                        })
                        .catch((err) => reject(err))
                }
            })
            .catch(err => reject(err))
    })

//*
// Function exported to group option
// Upload image to Firebase storage
// Sets up DL link to group's doc
//*
export const uploadGroupImage = async (uri, groupName) => {
    const { downloadURL, imageName } = await uploadImageToFirebase(uri, groupName);
    const setGroupDlLinkToCloud = await setGroupDlLinkToFirestoreGroup(downloadURL, groupName, imageName)
    return { downloadURL, imageName }
}

// upload image to firebase storage
export const uploadImageToFirebase = (uri, groupName) => {
    return new Promise((resolve, reject) => {
        let imgUri = uri.uri;
        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const sessionId = new Date().getTime()
        const imageName = `Groups Pictures/${groupName}_${sessionId}.jpg`
        // grab photo name from CloudFirebase group
        firebase
            .firestore()
            .collection('Public_Groups')
            .doc(groupName)
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

//*
// Sets up dl link to group's document
//*
export const setGroupDlLinkToFirestoreGroup = (downloadURL, groupName, imageName) =>
    new Promise((resolve, reject) => {
        const ref = firebase.firestore()
            .collection('Public_Groups')
            .doc(groupName)
            .set({
                photoURL: downloadURL,
                photoName: imageName
            }, { merge: true })
            .then(resolve())
            .catch((error) => {
                reject(error)
            })
    })