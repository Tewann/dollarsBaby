//Store/Reducers/contactReducer.js

const initialState = {
    contactList: [
        {
            id: 1,
            nom: 'John'
        },
        {
            id: 2,
            nom: 'Macron'
        }, {
            id: 3,
            nom: 'Angela'
        }, {
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
        }, 
        {
            id: 8,
            nom: 'Mike'
        },
        {
            id: 9,
            nom: 'Qupoi'
        },
        {
            id: 10,
            nom: 'Maman'
        }, 
        {
            id: 11,
            nom: 'Papa'
        }, 
        {
            id: 12,
            nom: 'Soeur'
        }, 
        {
            id: 13,
            nom: 'Frère'
        }, 
        {
            id: 14,
            nom: 'Président'
        }, 
        {
            id: 15,
            nom: 'Lautre con'
        }, 
        {
            id: 16,
            nom: 'un Imbécile'
        },
        {
            id: 17,
            nom: 'Papa'
        }, 
        {
            id: 18,
            nom: 'Soeur'
        }, 
        {
            id: 19,
            nom: 'Frère'
        }, 
        {
            id: 20,
            nom: 'Président'
        }, 
        {
            id: 21,
            nom: 'Lautre con'
        }, 
        {
            id: 22,
            nom: 'un Imbécile'
        },
    ]
}

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