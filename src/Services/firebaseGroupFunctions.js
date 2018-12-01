import firebase from "react-native-firebase";
import { Platform } from "react-native";
import Store from '../Store/configureStore'

// create public group in Firestore
export const createPublicGroupInFirestore = (groupName, username) =>
  new Promise((resolve, reject) => {
    const ref = firebase.firestore().collection("Public_Groups");
    // create group
    const createGroup = ref
      .doc(groupName)
      .get()
      .then(doc => {
        //if group name available create group's doc
        if (!doc.exists) {
          ref
            .doc(groupName)
            .set({
              GroupName: groupName,
              type: "public",
              creator: username,
              photoURL: null,
              photoName: null
            })
            .then(resolve())
            .catch(error => {
              reject(error);
            });
          // if user name already taken return error
        } else {
          reject("Group name taken");
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const joinPublicGroupInFirestore = (groupName, username) =>
  new Promise((resolve, reject) => {
    // Group and user reference in database
    const ref = firebase.firestore().collection("Public_Groups");
    const userRef = firebase
      .firestore()
      .collection("Users")
      .doc(username);

    // Checking if user is already in the group
    const joinGroup = ref
      .doc(groupName)
      .collection("Members")
      .where("name", "==", username)
      .get()
      .then(results => {
        // if user already in group => reject error
        if (!results.empty) {
          reject("User already in group");
        } else {
          // if user is not already a member of the requested group
          // user is added to group members collection
          // the group is added to the user's group collection

          // 1 - Adding user to the group member collection
          ref
            .doc(groupName)
            .collection("Members")
            .add({
              name: username
            })
            .then(() => {
              // grab group Creator name and Photo Url of the group and returns it
              ref
                .doc(groupName)
                .get()
                .then(res => {
                  creator = res.data().creator;
                  photoURL = res.data().photoURL;

                  resolve(creator, photoURL);
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));

          // 2 - Adding group name and type to user's profil's group collection
          userRef
            .collection("Groups")
            .add({
              name: groupName,
              type: "public"
            })
            .catch(err =>
              reject("error when adding group to user profil : ", err)
            );
        }
      })
      .catch(err => reject(err));
  });

//*
// Create a private group in firestore
//*
export const createPrivateGroupInFirestore = (groupName, username) =>
  new Promise((resolve, reject) => {
    // Group reference in database
    const ref = firebase.firestore().collection("Private_Groups");
    // Checks if group name is already taken, if not create group
    const createGroup = ref
      .doc(groupName)
      .get()
      .then(doc => {
        //if group name available create group's doc
        if (!doc.exists) {
          ref
            .doc(groupName)
            .set({
              GroupName: groupName,
              type: "private",
              creator: username,
              photoURL: null,
              photoName: null
            })
            .then(resolve())
            .catch(error => {
              reject(error);
            });
          // if user name already taken return error
        } else {
          reject("Group name taken");
        }
      })
      .catch(error => {
        reject(error);
      });
  });

//*
// Add contact to private group
// A cloud function add token informations
//*
export const addContactToPrivateGroup = (groupName, username) =>
  new Promise((resolve, reject) => {
    // Group and user reference in database
    const userRef = firebase
      .firestore()
      .collection("Users")
      .doc(username);
    const ref = firebase.firestore().collection("Private_Groups");

    // Checking if user is already in the group
    ref
      .doc(groupName)
      .collection("Members")
      .where("name", "==", username)
      .get()
      .then(res => {
        if (!res.empty) {
          // if user is already in the private group => reject error
          reject("User already in group");
        } else {
          // if user is not already a member of the requested group
          // user is added to the private group members collection
          // the group is added to the user's group collection
          // 1 - Add contact to private group members collection
          ref
            .doc(groupName)
            .collection("Members")
            .add({
              name: username
            })
            .then(resolve())
            .catch(error => {
              reject(error);
            });

          // 2 - Adding group name and type to user's profil's group collection
          userRef
            .collection("Groups")
            .add({
              name: groupName,
              type: "private"
            })
            .catch(err =>
              reject("error when adding private group to User group list : ", err)
            );
        }
      });
  });

// -----------------------------------------
//              UPLOAD GROUP IMAGES
// -----------------------------------------

//*
// Function exported to group options
// Upload image to Firebase storage
// Sets up DL link to group's doc
//*
export const uploadGroupImage = async (uri, groupName, groupType) => {
  const { downloadURL, imageName } = await uploadImageToFirebase(
    uri,
    groupName,
    groupType
  );
  const setGroupDlLinkToCloud = await setGroupDlLinkToFirestoreGroup(
    downloadURL,
    groupName,
    imageName,
    groupType
  );
  return { downloadURL, imageName };
};

// upload image to firebase storage
export const uploadImageToFirebase = (uri, groupName, groupType) => {
  return new Promise((resolve, reject) => {
    let imgUri = uri.uri;
    const uploadUri =
      Platform.OS === "ios" ? imgUri.replace("file://", "") : imgUri;
    const sessionId = new Date().getTime();
    const imageName = `Groups Pictures/${groupName}_${sessionId}.jpg`;
    const collectionType =
      groupType === "public" ? "Public_Groups" : "Private_Groups";

    // grab photo name from CloudFirebase group
    firebase
      .firestore()
      .collection(collectionType)
      .doc(groupName)
      .get()
      .then(doc => {
        previousPhotoName = doc.get("photoName");
        // if there is a photo name already set
        // delete the previous photo in firebase storage
        if (previousPhotoName !== null) {
          firebase
            .storage()
            .ref(previousPhotoName)
            .delete()
            .then()
            .catch(error => console.log("erreur lors suppression", error));
        }
      });
    // upload new image to firebase storage
    firebase
      .storage()
      .ref(imageName)
      //.child(imageName)
      .putFile(uploadUri)
      .then(result => {
        const downloadURL = result.downloadURL;
        const toResolve = { downloadURL, imageName };
        resolve(toResolve);
      })
      .catch(error => reject(error));
  });
};

//*
// Sets up photo url dl link to group's document
//*
export const setGroupDlLinkToFirestoreGroup = (
  downloadURL,
  groupName,
  imageName
) =>
  new Promise((resolve, reject) => {
    const collectionType =
      groupType === "public" ? "Public_Groups" : "Private_Groups";
    const ref = firebase
      .firestore()
      .collection(collectionType)
      .doc(groupName)
      .set(
        {
          photoURL: downloadURL,
          photoName: imageName
        },
        { merge: true }
      )
      .then(resolve())
      .catch(error => {
        reject(error);
      });
  });

//*
// Called by GroupOptions.js (componentDidMount())
// Grabs contact list each time user click onto a private group
// Calls reducer to update contact list
//*
export const retrivingContacts = async (currentGroup) => {
  let contacts = []
  let newId = 1

  const grabbingContacts = await firebase
    .firestore()
    .collection('Private_Groups')
    .doc(currentGroup)
    .collection('Members')
    .get()
    .then(members => {
      members.forEach(doc => {
        const member = doc.data().name
        let contactId = newId
        const contact = { name: member, id: contactId }
        contacts.push(contact)
        newId++
      })
    })
  const action = {
    type: 'GROUP_CONTACTS_LIST',
    value: { currentGroup, contacts }
  }
  Store.dispatch(action)

  return contacts
} 
