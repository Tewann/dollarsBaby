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
    messagesReceived: [
        {
            id: 1,
            predefined_message: 'Message Test',
            additionnal_message: ""
        }
    ],
    messageToSend: ""


}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {

        //Action to send Predefined Messages 
        case 'SEND_MESSAGE':
            const newId = state.messagesReceived[state.messagesReceived.length - 1].id + 1
            let newMessage = {}
            // Checking if and addionnal message has to be send
            // if no
            if (state.messageToSend == "") {
                newMessage = { id: newId, predefined_message: action.value }

            // if yes, getting it directly from redux state
            } else {
                newMessage = {
                    id: newId,
                    predefined_message: action.value,
                    additionnal_message: state.messageToSend
                }
            }
            nextState = {
                ...state,
                messagesReceived: [...state.messagesReceived, newMessage]
            }
            return nextState || state


        // Action : getting the additionnal text to send with one of predefined messages   
        case 'MESSAGE_TO_SEND':
            nextState = {
                ...state,
                messageToSend: message = action.value
            }
            return nextState || state

        default:
            return state
    }
}

export default displayMessagesList