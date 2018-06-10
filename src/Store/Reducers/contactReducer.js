//Store/Reducers/contactReducer.js

const initialState = { contactList: [
    {
        id: 1,
        nom: 'John'
    },
    {
        id: 2,
        nom: 'Macron'
    },    {
        id: 3,
        nom: 'Angela'
    },    {
        id: 4,
        nom: 'Donald'
    },    {
        id: 5,
        nom: 'Barack'
    },    {
        id: 6,
        nom: 'Kim'
    },    {
        id: 7,
        nom: 'Vlad'
    },    {
        id: 8,
        nom: 'Mike'
    },
] }

function contactManagment(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_CONTACT':
            return nextState || state
    default:
        return state
    }
}

export default contactManagment