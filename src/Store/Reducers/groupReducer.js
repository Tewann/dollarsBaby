// Store/Reducers/groupReducer.js
import { Alert } from 'react-native'

const initialState = {
    currentDisplayedGroup: ['GroupList'],
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
                newId = state.groupList[0].id + 1
            }
            // create new group    
            const newPublicGroup = {
                id: newId,
                name: action.value,
                photoURL: null,
                type: 'public',
                status: 'created'
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
                newId1 = state.groupList[0].id + 1
            }
            // create new group   
            const newJoinedPublicGroup = {
                id: newId1,
                name: action.value[0],
                photoURL: action.value[1],
                type: 'public',
                status: 'joined'
            }
            nextState = {
                ...state,
                groupList: [...state.groupList, newJoinedPublicGroup]
            }
            return nextState || state

        case 'CREATE_PRIVATE_GROUP':
            // Group name already exist or not in group list
            const groupNameIndex = state.groupList.findIndex(item => item.nom ===
                action.value)

            //  Group name already exists in group list
            if (groupNameIndex !== -1) {
                const errorMessage = 'Vous avez déjà un groupe qui a le nom : ' + action.value
                Alert.alert(
                    'Erreur',
                    errorMessage,
                    [
                        { text: 'Fermer' }
                    ]
                )

                // Group name doesn't exist in group list
                // Group created
            } else {
                const newId = state.groupList[state.groupList.length - 1].id + 1
                const newPrivateGroup = { id: newId, nom: action.value }
                nextState = {
                    ...state,
                    groupList: [...state.groupList, newPrivateGroup]
                }
            }
            return nextState || state

        case 'ADD_CONTACT_TO_GROUP':

            // Contact is or is not in the contact group list
            const contactNameIndex = state.groupList[action.value.groupId - 1].contacts.findIndex(item => item.id ===
                action.value.contactId)

            // Contact already in group contact list
            if (contactNameIndex !== -1) {
                const errorMessage = state.groupList[action.value.groupId - 1].contacts[contactNameIndex].nom +
                    ' est déjà dans ce groupe'
                Alert.alert(
                    'Erreur',
                    errorMessage,
                    [
                        { text: 'Fermer' }
                    ]
                )

                // Contact is not in group
                // Contact is added
            } else {
                const newContact = { id: action.value.contactId, nom: action.value.contactName }
                nextState = {
                    ...state,
                    groupList: [...state.groupList],
                }
                nextState.groupList[action.value.groupId - 1].contacts = [...nextState.groupList[action.value.groupId - 1].contacts, newContact]
            }
            return nextState || state

        case "RESET_GROUP_LIST":
            return initialState;

        default:
            return state
    }
}

export default groupManagment