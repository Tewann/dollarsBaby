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

    ]
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {

        //  When a message has been send by current user
        // message is added to messages history list 
        case 'MESSAGE_SENDED':
            // if there is no messages
            if (state.messagesHistory.length === 0) {
                const newId = 1
                const newMessage = {
                    id: newId,
                    type: 'send',
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp
                }
                nextState = {
                    ...state,
                    messagesHistory: [newMessage, ...state.messagesHistory]
                }

                // if there is messages
            } else {
                const newId = state.messagesHistory[state.messagesHistory.length - 1].id + 1
                const newMessage = {
                    id: newId,
                    type: 'send',
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp
                }
                nextState = {
                    ...state,
                    messagesHistory: [newMessage, ...state.messagesHistory]
                }
            }
            return nextState || state

        case 'MESSAGE_RECEIVED':
            console.log('message received')
            console.log(action.value)
            const contact = action.value.get('title')
            
            /*
            // if there is no messages
            if (state.messagesHistory.length === 0) {
                const newId = 1
                const newMessage = {
                    id: newId,
                    type: 'send',
                    sendTo: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp
                }
                nextState = {
                    ...state,
                    messagesHistory: [newMessage, ...state.messagesHistory]
                }

                // if there is messages
            } else {
                const newId = state.messagesHistory[state.messagesHistory.length - 1].id + 1
                const newMessage = {
                    id: newId,
                    type: 'send',
                    sendTo: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp
                }
                nextState = {
                    ...state,
                    messagesHistory: [newMessage, ...state.messagesHistory]
                }
            }
            */
            return nextState || state

        case "RESET_MESSAGE_HISTORY":
            return initialState;

        default:
            return state
    }
}

export default displayMessagesList