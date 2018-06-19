//Store/Reducers/messageReducer.js

const initialState = {
    messagesList: [
        {
            id: 1,
            title: 'Appel moi'
        },
        {
            id: 2,
            title: 'Ok'
        },
        {
            id: 3,
            title: "J'arrive"
        },
        {
            id: 4,
            title: 'message 4 test'
        },
        {
            id: 5,
            title: 'message 5 test'
        },
        {
            id: 6,
            title: 'message 6 tes'
        },
    ],
    messagesReceived: [
        {
            id: 1,
            message: 'bonjour cava'
        }
    ]
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SEND_MESSAGE':
            const newId = state.messagesReceived[state.messagesReceived.length - 1].id + 1
            const newMessage = { id: newId, message: action.value}
            nextState = {
                ...state,
                messagesReceived: [...state.messagesReceived, newMessage]
            }
            return nextState || state
         default:
            return state
    }
}

export default displayMessagesList