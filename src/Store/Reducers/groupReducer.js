// Store/Reducers/groupReducer.js
import { Alert } from 'react-native'

const initialState = {
    groupList: [
        {
            id: 1,
            nom: 'USA'
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
        default:
            return state
    }
}

export default groupManagment