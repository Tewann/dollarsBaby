//Store/Reducers/contactReducer.js
import { Alert } from 'react-native'


const initialState = {
    contactList: [
        /*{
            id: 1,
            name: 'John',
            photoName: null,
            photoUrl: null,
        },
        /*{
            id: 2,
            name: 'Macron'
        },
        /*{
            id: 3,
            name: 'Angela'
        },
        {
            id: 4,
            name: 'Donald'
        },
        {
            id: 5,
            name: 'Barack'
        },
        {
            id: 6,
            name: 'Kim'
        },
        {
            id: 7,
            name: 'Vlad'
        }*/
    ]
}

export const contactManagment = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'ADD_CONTACT':
            // Contact is or is not in the contact list
            //const contactNameIndex = state.contactList.findIndex(item => item.name ===
            //    action.value)

            // Contact is already in the contact list
            if (contactNameIndex !== -1) {
                const errorMessage = action.value + ' est déjà dans votre liste de contact'
                Alert.alert(
                    'Erreur',
                    errorMessage,
                    [
                        { text: 'Fermer' }
                    ]
                )

                // Contact is not in the contact list
                // Contact is added
            } else {
                const newId = state.contactList[state.contactList.length - 1].id + 1
                const newContact = { id: newId, name: action.value }
                nextState = {
                    ...state,
                    contactList: [...state.contactList, newContact]
                }
                const alertMessage = action.value + ' a été ajouté à votre liste de contact'
                Alert.alert(
                    'Contact ajouté',
                    alertMessage,
                    [
                        { text: 'Fermer' }
                    ]
                )
            }
            return nextState || state

        case 'CONTACT_LIST_UPDATED':
            const databaseContactName = action.value.get('name')
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

        case "RESET":
            return initialState;

        default:
            return state
    }
}


export default contactManagment