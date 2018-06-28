//Store/Reducers/contactReducer.js
import { Alert } from 'react-native'


const initialState = {
    contactList: [
        {
            id: 1,
            name: 'John'
        },
        {
            id: 2,
            name: 'Macron'
        }, 
        {
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
        } 
    ]
}

function contactManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_CONTACT':
            // Contact is or is not in the contact list
            const contactNameIndex = state.contactList.findIndex(item => item.name ===
                action.value)
            
                // Contact is already in the contact list
                if (contactNameIndex !== -1) {
                    const errorMessage = action.value + ' est déjà dans votre liste de contact'
                    Alert.alert(
                        'Erreur',
                        errorMessage,
                        [
                            {text: 'Fermer'}
                        ]
                    )

                // Contact is not in the contact list
                // Contact is added
                } else {
                    const newId = state.contactList[state.contactList.length - 1].id + 1
                    const newContact = { id: newId, name: action.value}
                    nextState = {
                        ...state,
                        contactList: [...state.contactList, newContact]
                    }
                    const alertMessage = action.value + ' a été ajouté à votre liste de contact'
                    Alert.alert(
                        'Contact ajouté',
                        alertMessage,
                        [
                            {text: 'Fermer'}
                        ]
                    )
                }
            return nextState || state
        default:
            return state
    }
}

export default contactManagment