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
            title: "Appelle moi"
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
            let newIdSend = null
            // if there is no messages
            if (state.messagesHistory.length === 0) {
                newIdSend = 1
                // if there is messages
            } else {
                newIdSend = state.messagesHistory[0].id + 1
            }

            const newMessageSend = {
                id: newIdSend,
                type: action.value.type,
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: action.value.additionnal_message,
                timeStamp: action.value.timeStamp,
            }
            nextState = {
                ...state,
                messagesHistory: [newMessageSend, ...state.messagesHistory]
            }
            return nextState || state

        case 'MESSAGE_RECEIVED':
            // check if message is already in message history
            const messageReceivedId = action.value.get('messageId')
            const messageIndex = state.messagesHistory
                .findIndex(item => item.messageReceivedId === messageReceivedId)
            let newMessage = null

            // if message is not in history
            // add message
            if (messageIndex === -1) {
                // get message values from firestore doc
                const contact = action.value.get('title')
                const predefined_message = action.value.get('predefined_message')
                const additionnal_message = action.value.get('additional_message')
                const timeStamp = action.value.get('timeStamp')
                const type = action.value.get('type')
                let newId = null

                // sets newId
                // if there is no messages in history
                if (state.messagesHistory.length === 0) {
                    newId = 1
                    // if there is messages
                } else {
                    newId = state.messagesHistory[0].id + 1

                }
                // create new message
                newMessage = {
                    id: newId,
                    type: type,
                    contact: contact,
                    predefined_message: predefined_message,
                    additionnal_message: additionnal_message,
                    timeStamp: timeStamp,
                    messageReceivedId: messageReceivedId
                }

                nextState = {
                    ...state,
                    messagesHistory: [newMessage, ...state.messagesHistory]
                }
            }
            return nextState || state

        case 'CONTACT_REQUEST_ACCEPTED':
            // called when contact request has been accepted
            // create new message with status accepted
            // uses same id for the message
            const contactRequestAcceptedMessage = {
                id: action.value.id,
                type: action.value.type,
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: action.value.additionnal_message,
                timeStamp: action.value.timeStamp,
                messageReceivedId: action.value.messageReceivedId,
                status: 'accepted'
            }
            
            const updatedMessageHistoryWhenAccepted = state.messagesHistory.map(item => {
                if(item.id === action.value.id) {
                    return contactRequestAcceptedMessage
                }
                return item
            })
            
            nextState = {
                ...state,
                messagesHistory: updatedMessageHistoryWhenAccepted
            }
            return nextState || state

        case 'CONTACT_REQUEST_DECLINED':
            // called when contact request has been declined
            // create new message with status declined
            // uses same id for the message 
            const contactRequestDeclinedMessage = {
                id: action.value.id,
                type: action.value.type,
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: action.value.additionnal_message,
                timeStamp: action.value.timeStamp,
                messageReceivedId: action.value.messageReceivedId,
                status: 'declined'
            }

            const updatedMessageHistoryWhenDeclined = state.messagesHistory.map(item => {
                if(item.id === action.value.id) {
                    return contactRequestDeclinedMessage
                }
                return item
            })

            nextState = {
                ...state,
                messagesHistory: updatedMessageHistoryWhenDeclined
            }
            return nextState || state

        case "RESET_MESSAGE_HISTORY":
            return initialState;

        default:
            return state
    }
}

export default displayMessagesList