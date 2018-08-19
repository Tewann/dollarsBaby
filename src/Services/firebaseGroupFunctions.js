import firebase from 'react-native-firebase'
import { Alert } from 'react-native'

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
                            // grab group Photo Url and returns it
                            ref.doc(groupName).get()
                                .then(res => resolve(res.data().photoURL)
                                    .catch(err => reject(err))
                                )
                                .catch((err) => reject(err))
                        })
                }
            })
            .catch(err => reject(err))
    })