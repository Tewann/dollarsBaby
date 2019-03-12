//Store/Reducers/contactReducer.js

const initialState = {
    currentDisplayedContact: ['ContactsList'],
    currentDisplayedContactScreen: ['conversation'],
    contactList: []
}

export const contactManagment = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'SWITCH_CONTACT_SCREEN_OPTIONS':
            nextState = {
                ...state,
                currentDisplayedContactScreen: [action.value]
            }
            return nextState || state

        case 'SWITCH_CONTACT_SCREEN':
            nextState = {
                ...state,
                currentDisplayedContact: [action.value]
            }
            return nextState || state

        case 'MODIFY_CONTACT_NICKNAME':
            const contactIndex = state.contactList.findIndex(item => item.name === action.value[0])
            nextState = {
                ...state,
                contactList: state.contactList.map((content, i) => i === contactIndex ? {
                    ...content,
                    nickname: action.value[1]
                } :
                    content)
            }
            return nextState || state

        case 'DELETE_CONTACT':
            const dbContactName = action.value.get('name')
            const deletedContactIndex = state.contactList.findIndex(item => item.name === dbContactName)
            const deleteContactList = state.contactList.filter((value, index, arr) => {
                return index !== deletedContactIndex;
            });
            nextState = {
                ...state,
                contactList: deleteContactList
            }
            return nextState || state

        case 'CONTACT_LIST_UPDATED':
            const databaseContactName = action.value.get('UserName')
            const databasephotoName = action.value.get('photoName')
            const databasephotoUrl = action.value.get('photoUrl')
            const contactNameIndex = state.contactList.findIndex(item => item.name === databaseContactName)
            // Contact is already in the contact list
            if (contactNameIndex !== -1) {
                // if photo has been updated
                if (state.contactList[contactNameIndex].photoUrl !== databasephotoUrl) {
                    nextState = {
                        ...state,
                        contactList: state.contactList.map((content, i) => i === contactNameIndex ? {
                            ...content,
                            photoName: databasephotoName,
                            photoUrl: databasephotoUrl,
                        } :
                            content)
                    }
                    // Contact is not in the contact list
                    // Contact is added
                }
            } else if (databaseContactName == undefined) {
                // fix to first call to reducer is undefined
                nextState = state
            } else {
                // if no contacts
                if (state.contactList.length === 0) {
                    const newId = 1
                    const newContact = {
                        id: newId,
                        name: databaseContactName,
                        photoName: databasephotoName,
                        photoUrl: databasephotoUrl
                    }
                    nextState = {
                        ...state,
                        contactList: [...state.contactList, newContact]
                    }
                    // if there is contacts
                } else {
                    const newId = state.contactList[state.contactList.length - 1].id + 1
                    const newContact = {
                        id: newId,
                        name: databaseContactName,
                        photoName: databasephotoName,
                        photoUrl: databasephotoUrl
                    }
                    nextState = {
                        ...state,
                        contactList: [...state.contactList, newContact]
                    }
                }
            }
            return nextState || state

        case "MOVE_CONTACT_FIRST":
            const contactIndexToMoveFirst = state.contactList.findIndex(item => item.name === action.value)
            if (contactIndexToMoveFirst !== 0) {
                let clonedContactList = [].concat(state.contactList)
                const contactToMoveFirst = clonedContactList.splice(contactIndexToMoveFirst, 1)
                clonedContactList.unshift(contactToMoveFirst[0])
                nextState = {
                    ...state,
                    contactList: clonedContactList
                }
            }
            return nextState || state

        case "INCREMENT_UNREAD_MESSAGES_FOR_CONTACT":
            if (state.currentDisplayedContact[0] !== action.value[0]) {
                const contactNameIndexToIncrement = state.contactList.findIndex(item => item.name === action.value[0])
                const unreadMessages = state.contactList[contactNameIndexToIncrement].unreadMessages
                const unreadMessageAlreadyExists = unreadMessages === undefined ? undefined : state.contactList[contactNameIndexToIncrement].unreadMessages.find((el) => {
                    return el == action.value[1]
                })
                if (unreadMessageAlreadyExists === undefined) {
                    const newUnreadMessages = unreadMessages === undefined ? [action.value[1]] : [action.value[1], ...state.contactList[contactNameIndexToIncrement].unreadMessages]
                    nextState = {
                        ...state,
                        contactList: state.contactList.map((content, i) => i === contactNameIndexToIncrement ? {
                            ...content,
                            unreadMessages: newUnreadMessages
                        } :
                            content)
                    }
                }
            }
            return nextState || state

        case "RESET_UNREAD_MESSAGES_FOR_CONTACT":
            const contactNameIndexToReset = state.contactList.findIndex(item => item.name === action.value)
            nextState = {
                ...state,
                contactList: state.contactList.map((content, i) => i === contactNameIndexToReset ? {
                    ...content,
                    unreadMessages: undefined
                } :
                    content)
            }
            return nextState || state

        case "RESET_CONTACT":
            return initialState;

        default:
            return state
    }
}


export default contactManagment
