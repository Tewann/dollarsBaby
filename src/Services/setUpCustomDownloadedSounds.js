import firebase from 'react-native-firebase'
import Store from '../Store/configureStore'

export const grabCustomsSounds = async (userName) => {
    soundsToDownload = []
/*     // Grabs sounds of contacts
    await firebase.firestore()
        .collection('Users')
        .doc(userName)
        .collection('contactList')
        .get()
        .then(async (contacts) => {
            for (const contact of contacts.docs) {
                await firebase.firestore()
                    .collection('Users')
                    .doc(contact.get('name'))
                    .collection('SoundsUploaded')
                    .get()
                    .then((sounds) => {
                        for (const sound of sounds.docs) {
                            if (sound.data().useSoundFor !== (null || undefined)) {
                                // if sound has been used to create a predefined message : push sound
                                soundsToDownload.push(sound)
                            }
                        }
                    })
            }
        })
        .catch(err => console.log(err)) */

    // Grabs sounds of groups
    await firebase.firestore()
        .collection('Users')
        .doc(userName)
        .collection('Groups')
        .get()
        .then(async (groups) => {
            for (const group of groups.docs) {
                const groupType = group.get('type') === 'private' ? 'Private_Groups' : 'Public_Groups'
                const groupName = group.get('name')
                // For each group grabs creator name
                await firebase.firestore()
                    .collection(groupType)
                    .doc(groupName)
                    .get()
                    .then(async (groupDoc) => {
                        const groupCreator = groupDoc.get('creator')

                        // Grabs sounds of the creator
                        await firebase.firestore()
                            .collection('Users')
                            .doc(groupCreator)
                            .collection('SoundsUploaded')
                            .get()
                            .then((sounds) => {
                                for (const sound of sounds.docs) {
                                    // If the sound is used to groups or all push it to the sounds to dl
                                    if (/*sound.data().useSoundFor === 'All' ||*/ sound.data().useSoundFor === 'Groups') {
                                        const newFileName = sound.data().newFileName // Name-filename-timestamp

                                        // Checks if sound is already in sounds to dl array
                                        const existsInSoundsToDlArray = soundsToDownload.some((element) => {
                                            return element.data().newFileName === newFileName
                                        })

                                        // if the sound is not already in the array, pushes it
                                        if (!existsInSoundsToDlArray) {
                                            soundsToDownload.push(sound)
                                        }
                                    }
                                }
                            })
                    })
            }
        })
        .catch(err => console.log(err))
           return soundsToDownload
}




export const setUpSoundsForAndroid = async (userName) => {
    // Get redux state
    const currentSoundsSetUp = Store.getState().soundsDownloadedReducer.soundsDownloaded

    // Get all sounds uploaded from contacts which are used to a custom message by the contact 
    const soundsToDownload = await grabCustomsSounds(userName)

    // for each sound to DL
    for (const soundToDl of soundsToDownload) {
        const newFileName = soundToDl.data().newFileName // Name-timestamp-filename
        const name = soundToDl.data().name // soundname (ex sound.wav)
        const downloadUrl = soundToDl.data().downloadUrl

        // Checks if sound is already in the current redux state
        const existsInCurrentReduxState = currentSoundsSetUp.some((element) => {
            return element.sound === newFileName
        })

        // if the sound does not exist in redux state
        if (!existsInCurrentReduxState) {
            // Adds the sound to the state
            const action = {
                type: 'ADD_SOUND_TO_STATE',
                value: {
                    sound: newFileName,
                    downloadUrl: downloadUrl
                }
            }
            Store.dispatch(action)

            // create the sound channel
            const channelToCreate = new firebase.notifications.Android.Channel(newFileName, newFileName, firebase.notifications.Android.Importance.Max)
                .setDescription(`'Custom sounds from groups' // ${newFileName}`)
                .setSound(downloadUrl);
            firebase.notifications().android.createChannel(channelToCreate);

            // Updates the profil of the user, add the sound as downloaded and useable
            firebase
                .firestore()
                .collection('Users')
                .doc(userName)
                .collection('SoundsDownloaded')
                .doc(newFileName)
                .set({

                })
                .catch(err => console.log(err))
        }
    }

    // Detele unused channels
    for (const currentSound of currentSoundsSetUp) {
        const currentSoundName = currentSound.sound

        // Checks if sound is already in the sounds to dl array
        const existsInSoundsToDlArray = soundsToDownload.some((element) => {
            //const newFileName = soundToDl.data().newFileName // Name-timestamp-filename
            return element.data().newFileName === currentSoundName
        })

        // If the sound does not exist in the sounds to dl (meaning the sound has been downloaded, but is no longer needed) 
        // => delete the channel and remove the reference in sounds downloaded user collection and remove sound from redux state
        if (!existsInSoundsToDlArray) {
              const action = {
                type: 'REMOVE_SOUND_TO_STATE',
                value: {
                    sound: currentSoundName,
                }
            }
            Store.dispatch(action)

            firebase.notifications().android.deleteChannel(currentSoundName)
                .catch(err => console.log(err))

            firebase
                .firestore()
                .collection('Users')
                .doc(userName)
                .collection('SoundsDownloaded')
                .doc(currentSoundName)
                .delete()
                .catch(err => console.log(err))
        }
    }
}
