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

export const joinPublicGroupInFirestore = () => 
    new Promise((resolve, reject) => {
        
    })