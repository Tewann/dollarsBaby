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

        case 'DELETE_GROUP':
            const dbGroupName = action.value.get('name')
            const deletedGroupIndex = state.groupList.findIndex(item => item.name === dbGroupName && item.type === action.value.get('type'))
            const deleteGroupList = state.groupList.filter((value, index, arr) => {
                return index !== deletedGroupIndex;
            });
            
            nextState = {
                ...state,
                groupList: deleteGroupList
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
                        creator: action.value.get('creator')
                    } :
                        content)
                }
            }
            return nextState || state


        /**
         * PRIVATE GROUPS
         */

        case 'PRIVATE_GROUP_CONTACTS_LIST':
            const privateGroupIndex = state.groupList.findIndex(item =>
                (item.name === action.value.currentGroup) && (item.type === 'private'))
            nextState = {
                ...state,
                groupList: state.groupList.map((content, i) => (i === privateGroupIndex) ? {
                    ...content,
                    contacts: action.value.contacts
                } :
                    content)
            }
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
                        creator: action.value.get('creator')
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