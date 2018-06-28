// Store/Reducers/groupReducer.js
import { Alert } from 'react-native'

const initialState = {
    groupList: [
        {
            id: 1,
            nom: 'USA',
            contacts: [
                {
                    id: 1,
                    nom: 'John'
                },
                {
                    id: 2,
                    nom: 'Macron'
                },
            ]
        },
        {
            id: 2,
            nom: 'EU'
        }
    ]
}

function groupManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
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

        default:
            return state
    }
}

export default groupManagment