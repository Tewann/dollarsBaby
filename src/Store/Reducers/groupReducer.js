// Store/Reducers/groupReducer.js
import { Alert } from 'react-native'

const initialState = {
    currentDisplayedGroup: ['GroupList'],
    predefinedGroupMessagesList: [
        {
            id: 1,
            title: 'Blink'
        },
        {
            id: 2,
            title: "Test"
        },
        {
            id: 3,
            title: "Urgent"
        },
        {
            id: 4,
            title: "Appelle moi"
        },
        {
            id: 5,
            title: "J'arrive"
        },
        {
            id: 6,
            title: "C'est fait"
        },
    ],
    groupList: []
}

function groupManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SWITCH_GROUP_SCREEN':
            nextState = {
                ...state,
                currentDisplayedGroup: [action.value]
            }
            return nextState || state

        case 'CREATE_PUBLIC_GROUP':
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

        case 'JOIN_PUBLIC_GROUP':
            // sets newId
            // if there is no group
            if (state.groupList.length === 0) {
                newId1 = 1
                // if there is groups
            } else {
                newId1 = state.groupList[state.groupList.length - 1].id + 1
            }
            // create new group   
            const newJoinedPublicGroup = {
                id: newId1,
                name: action.value[0],
                photoURL: action.value[1],
                type: 'public',
                creator: action.value[2]
            }
            nextState = {
                ...state,
                groupList: [...state.groupList, newJoinedPublicGroup]
            }
            return nextState || state

        case 'GROUP_PHOTO_UPDATED':
            // value: {currentGroup, dlURL, PhotoName}
            const groupNameIndexForPhoto = state.groupList.findIndex(item =>
                item.name === action.value.groupName)
            nextState = {
                ...state,
                groupList: state.groupList.map((content, i) => i === groupNameIndexForPhoto ? {
                    ...content,
                    photoName: action.value.PhotoName,
                    photoURL: action.value.dlURL,
                } :
                    content)
            }
            return nextState || state

        case 'CREATE_PRIVATE_GROUP':
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

        case 'NEW_PRIVATE_GROUP_CONTACT':
            const groupIndex = state.groupList.findIndex(item =>
                (item.name === action.value.groupName) && (item.type === 'private'))
            // Contact is or is not in the contact group list
            const contactNameIndex = state.groupList[groupIndex].contacts.findIndex(item => item.name ===
                action.value.contactName)

            // Contact already in group contact list
            if (contactNameIndex !== -1) {
               return
                // Contact is not in group
                // Contact is added
            } else {
                if (state.groupList[groupIndex].contacts.length === 0) {
                    // if no contacts
                    const newId = 1
                } else {
                    const newId = state.groupList[groupIndex].contacts[state.groupList[groupIndex].contacts.length - 1].id + 1
                }
                const newContact = { name: action.value.contactName, id: newId }
                nextState = {
                    ...state,
                    groupList: [...state.groupList],
                }
                nextState.groupList[groupIndex].contacts = [...nextState.groupList[groupIndex].contacts, newContact]

            }
            return nextState || state

        case "RESET_GROUP_LIST":
            return initialState;

        default:
            return state
    }
}

export default groupManagment