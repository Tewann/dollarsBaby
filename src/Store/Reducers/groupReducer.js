// Store/Reducers/groupReducer.js
import { strings } from '../../i18n'

const initialState = {
    currentDisplayedGroup: ['GroupList'],
    currentDisplayedGroupScreen: 'conversation',
    predefinedGroupMessagesList: [
        {
            id: 1,
            title: 'Blink',
            sound: 's1blink'
        },
        {
            id: 2,
            title: strings('reducers.where'),
            sound: "s2tesou"
        },
        {
            id: 3,
            title: strings('reducers.urgent'),
            sound: "s3urgent"
        },
        {
            id: 4,
            title: strings('reducers.forget'),
            sound: "s4oubliepas"
        },
        {
            id: 5,
            title: strings('reducers.coming'),
            sound: "s5jarrive"
        },
        {
            id: 6,
            title: strings('reducers.done'),
            sound: "s6cestfait"
        },
    ],
    groupList: []
}

function groupManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SWITCH_GROUP_SCREEN_OPTIONS':
            nextState = {
                ...state,
                currentDisplayedGroupScreen: [action.value]
            }
            //console.log(nextState)
            //console.log(action.value)
            return nextState || state

        case 'SWITCH_GROUP_SCREEN':
            nextState = {
                ...state,
                currentDisplayedGroup: [action.value]
            }
            return nextState || state

        // ---------------------------
        // ---- PUBLIC GROUPS --------
        // ---------------------------

        case 'CREATE_PUBLIC_GROUP':
            // Reducer called when a new public group is created by the user
            // Add the group to the current state 

            // sets newId
            // if there is no group
            if (state.groupList.length === 0) {
                newId = 1
                // if there is groups
            } else {
                newId = state.groupList[state.groupList.length - 1].id + 1
            }
            // create new group    
            const newPublicGroup = {
                id: newId,
                name: action.value[0],
                photoURL: null,
                type: 'public',
                creator: action.value[1]
            }
            nextState = {
                ...state,
                groupList: [...state.groupList, newPublicGroup]
            }

            return nextState || state

        case "PUBLIC_GROUP_UPDATE":
            let nextState = null

            // Checks if the group already exist
            // If it does, value = index of the group
            // If it doesn't, value = -1
            const publicGroupNameIndex = state.groupList.findIndex(item =>
                (item.name === action.value.get('GroupName')) && (item.type === 'public'))

            // If the group doesn't exist => add group
            if (publicGroupNameIndex == -1) {
                // Sets group Id, if group list is empty, sets new id to 1
                // If group list is not empty, newID = group list length + 1
                const newID = state.groupList.length === 0 ? 1 : state.groupList[state.groupList.length - 1].id + 1
                // Creating new group
                const newPublicGroup = {
                    id: newID,
                    name: action.value.get('GroupName'),
                    photoName: action.value.get('photoName'),
                    photoURL: action.value.get('photoURL'),
                    type: action.value.get('type'),
                    creator: action.value.get('creator')
                }
                nextState = {
                    ...state,
                    groupList: [...state.groupList, newPublicGroup]
                }
            } else {
                // If group already exists => update photo of the group
                nextState = {
                    ...state,
                    groupList: state.groupList.map((content, i) => ((i === publicGroupNameIndex) && (content.type === 'public')) ? {
                        ...content,
                        photoName: action.value.get('photoName'),
                        photoURL: action.value.get('photoURL'),
                    } :
                        content)
                }
            }
            return nextState || state


        // ----------------------------
        // ---- PRIVATE GROUPS --------
        // ----------------------------


        /*case 'CREATE_PRIVATE_GROUP':
            // sets newId
            // if there is no group
            if (state.groupList.length === 0) {
                newId = 1
                // if there is groups
            } else {
                newId = state.groupList[state.groupList.length - 1].id + 1
            }
            // create new group    
            const newPrivateGroup = {
                id: newId,
                name: action.value[0],
                photoURL: null,
                type: 'private',
                creator: action.value[1],
                contacts: []
            }

            nextState = {
                ...state,
                groupList: [...state.groupList, newPrivateGroup]
            }
            return nextState || state

        /* case 'ADD_PRIVATE_GROUP':
             // sets newId
             // if there is no group
             if (state.groupList.length === 0) {
                 newId = 1
                 // if there is groups
             } else {
                 newId = state.groupList[state.groupList.length - 1].id + 1
             }
             // add new group    
             const newAddedPrivateGroup = {
                 id: newId,
                 name: action.value.groupName,
                 photoURL: action.value.photoURL,
                 type: 'private',
                 creator: action.value.creator,
                 contacts: action.value.contacts
             }
 
             nextState = {
                 ...state,
                 groupList: [...state.groupList, newAddedPrivateGroup]
             }
             return nextState || state */

        /*case 'NEW_PRIVATE_GROUP_CONTACT':
            const groupIndex = state.groupList.findIndex(item =>
                (item.name === action.value.groupName) && (item.type === 'private'))
            // Contact is or is not in the contact group list
            const contactNameIndex = state.groupList[groupIndex].contacts.findIndex(item => item.name ===
                action.value.contactName)

            // Contact already in group contact list
            if (contactNameIndex !== -1) {
                return state
                // Contact is not in group
                // Contact is added
            } else {
                let newContactId = null
                if (state.groupList[groupIndex].contacts.length === 0) {
                    // if no contacts
                    newContactId = 1
                } else {
                    newContactId = state.groupList[groupIndex].contacts[state.groupList[groupIndex].contacts.length - 1].id + 1
                }
                const newContact = { name: action.value.contactName, id: newContactId }
                nextState = {
                    ...state,
                    groupList: [...state.groupList],
                }
                nextState.groupList[groupIndex].contacts = [...nextState.groupList[groupIndex].contacts, newContact]

            }
            return nextState || state*/

        case 'GROUP_CONTACTS_LIST':
            const privateGroupIndex = state.groupList.findIndex(item =>
                (item.name === action.value.currentGroup) && (item.type === 'private'))
            const contacts = action.value.contacts
            nextState = {
                ...state,
                groupList: [...state.groupList]
            }
            contacts.forEach(contact => {
                // Grabs contact name index in the contact list of the group (in current state)
                // If contact is in the current group contact list (return !== -1) does nothing
                // If contact is not in contact list : add it to state
                const contactNameIndex = state.groupList[privateGroupIndex].contacts.findIndex(item => item.name ===
                    contact.name)
                // Contact is not in the contact list of the group
                // Add contact to nextState
                if (contactNameIndex === -1) {
                    // Checks if contact list of the group is empty or not and sets appropriate id
                    if (state.groupList[privateGroupIndex].contacts.length === 0) {
                        newContactId = 1
                    } else {
                        newContactId = state.groupList[privateGroupIndex].contacts[state.groupList[privateGroupIndex].contacts.length - 1].id + 1
                    }
                    const newContact = { name: contact.name, id: newContactId }
                    nextState.groupList[privateGroupIndex].contacts.push(newContact) 
                }
            });
            return nextState || state


        case "PRIVATE_GROUP_UPDATE":
            // Checks if the group already exist
            // If it does, value = index of the group
            // If it doesn't, value = -1
            const privateGroupNameIndex = state.groupList.findIndex(item =>
                (item.name === action.value.get('GroupName')) && (item.type === 'private'))

            // If the group doesn't exist => add group
            if (privateGroupNameIndex == -1) {
                // Sets group Id, if group list is empty, sets new id to 1
                // If group list is not empty, newID = group list length + 1
                const newID = state.groupList.length === 0 ? 1 : state.groupList[state.groupList.length - 1].id + 1
                // Creating new group
                const newPrivateGroup = {
                    id: newID,
                    name: action.value.get('GroupName'),
                    photoName: action.value.get('photoName'),
                    photoURL: action.value.get('photoURL'),
                    type: 'private',
                    creator: action.value.get('creator'),
                    contacts: []
                }
                nextState = {
                    ...state,
                    groupList: [...state.groupList, newPrivateGroup]
                }
            } else {
                // If group already exists => update photo of the group
                nextState = {
                    ...state,
                    groupList: state.groupList.map((content, i) => ((i === privateGroupNameIndex) && (content.type === 'private')) ? {
                        ...content,
                        photoName: action.value.get('photoName'),
                        photoURL: action.value.get('photoURL'),
                    } :
                        content)
                }
            }
            return nextState || state


        case "RESET_GROUP_LIST":
            return initialState;

        default:
            return state
    }
}

export default groupManagment