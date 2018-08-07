// Store/Reducers/messageReducer.js

const initialState = {
    predefinedMessagesList: [
        {
            id: 1,
            title: 'Blink'
        },
        {
            id: 2,
            title: "T'es où ?"
        },
        {
            id: 3,
            title: "Urgent"
        },
        {
            id: 4,
            title: "Appel moi"
        },
        {
            id: 5,
            title: "J'arrive"
        },
        {
            id: 6,
            title: "C'est fait"
        },
    ],
    messagesHistory: [
        {
            id: 1,
            predefined_message: 'Message Test',
            additionnal_message: ""
        }
    ]
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {

        //  When a message has been send by current user
        // message is added to messages history list 
        case 'MESSAGE_SENDED':
            const newId = state.messagesHistory[state.messagesHistory.length - 1].id + 1
            const newMessage = {
                id: newId,
                type: 'send',
                sendTo: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: action.value.additionnal_message
            }
            nextState = {
                ...state,
                messagesHistory: [...state.messagesHistory, newMessage]
            }
            return nextState || state

        default:
            return state
    }
}

export default displayMessagesList