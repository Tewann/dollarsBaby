//Store/Reducers/contactReducer.js
import { Alert } from 'react-native'


const initialState = {
    contactList: [
        {
            id: 1,
            nom: 'John'
        },
        {
            id: 2,
            nom: 'Macron'
        }, 
        {
            id: 3,
            nom: 'Angela'
        }, 
        {
            id: 4,
            nom: 'Donald'
        }, 
        {
            id: 5,
            nom: 'Barack'
        }, 
        {
            id: 6,
            nom: 'Kim'
        }, 
        {
            id: 7,
            nom: 'Vlad'
        } 
    ]
}

function contactManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_CONTACT':
            // Contact is or is not in the contact list
            const contactNameIndex = state.contactList.findIndex(item => item.nom ===
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
                    const newContact = { id: newId, nom: action.value}
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