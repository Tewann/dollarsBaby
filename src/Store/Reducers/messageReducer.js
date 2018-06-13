//Store/Reducers/messageReducer.js

const initialState = {
    messagesList: [
        {
            id: 1,
            title: 'message 1'
        },
        {
            id: 2,
            title: 'message 2'
        }, {
            id: 3,
            title: 'message 3'
        }, {
            id: 4,
            title: 'message 4'
        }, {
            id: 5,
            title: 'message 5'
        }, {
            id: 6,
            title: 'message 6'
        },
    ]
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_MESSAGE':
            return nextState || state
    default:
        return state
    }
   }

export default displayMessagesList