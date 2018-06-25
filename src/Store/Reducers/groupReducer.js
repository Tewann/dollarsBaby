// Store/Reducers/groupReducer.js

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
        case 'ADD_GROUP':
            return state
        default:
            return state
    }
}

export default groupManagment