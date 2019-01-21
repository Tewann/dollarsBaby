// Store/Reducers/messageReducer.js
import { strings } from '../../i18n'

const initialState = {
    predefinedMessagesList: [
        {
            id: 1,
            title: 'Blink',
            sound: 's1blink'
        },
        {
            id: 2,
            title: strings('reducers.where'),
            sound: "s2tesou"
        },
        {
            id: 3,
            title: strings('reducers.urgent'),
            sound: "s3urgent"
        },
        {
            id: 4,
            title: strings('reducers.forget'),
            sound: "s4oubliepas"
        },
        {
            id: 5,
            title: strings('reducers.coming'),
            sound: "s5jarrive"
        },
        {
            id: 6,
            title: strings('reducers.done'),
            sound: "s6cestfait"
        },
    ],

    customMessagesList: [],

    messagesHistory: []
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {

        //  When a message has been send by current user
        // message is added to messages history list 
        case 'MESSAGE_SENDED':
            let newIdSend = null
            let newMessageSend = null
            // grabs timestamp of the message and converts it in YY/MM//DD
            const sendTimeStamp = new Date(action.value.timeStamp)
            const sendMonth = sendTimeStamp.getUTCMonth() + 1; //months from 1-12
            const sendDay = sendTimeStamp.getUTCDate();
            const sendYear = sendTimeStamp.getUTCFullYear();
            const sendDate = sendYear + "/" + sendMonth + "/" + sendDay;

            // Checks index of the day in the message history
            const sendDateIndexInMessageList = state.messagesHistory.findIndex(item => item.title == sendDate)

            // If the day doesn't exist
            if (sendDateIndexInMessageList == -1) {
                // Sets new message id to 1
                newIdSend = 1
                // create new message
                newMessageSend = {
                    id: newIdSend,
                    type: action.value.type,
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp,
                }
                // Create new day
                const newDay = {
                    title: sendDate,
                    data: [
                        newMessageSend
                    ]
                }
                // Update nextState
                nextState = {
                    ...state,
                    messagesHistory: [
                        newDay,
                        ...state.messagesHistory
                    ]
                }
            } else {
                // If the day exist in the message history
                // add message
                newIdSend = state.messagesHistory[sendDateIndexInMessageList].data[0].id + 1
                // create new message
                newMessageSend = {
                    id: newIdSend,
                    type: action.value.type,
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp,
                }
                nextState = {
                    ...state,
                    messagesHistory: state.messagesHistory.map((content, i) => i === sendDateIndexInMessageList ? {
                        title: sendDate,
                        data: [
                            newMessageSend,
                            ...state.messagesHistory[sendDateIndexInMessageList].data
                        ]
                    } :
                        content)
                }
            }
            return nextState || state

        case 'MESSAGE_RECEIVED':
            // get message values from firestore doc
            const contact = action.value.get('title')
            const messageReceivedId = action.value.get('messageId')
            const predefined_message = action.value.get('predefined_message')
            const additionnal_message = action.value.get('additional_message')
            const timeStampForDate = action.value.get('timeStamp')
            const type = action.value.get('type')
            let newId = null
            let newMessage = null

            // grabs timestamp of the message and converts it in YY/MM//DD
            const timeStamp = new Date(timeStampForDate)
            const month = timeStamp.getUTCMonth() + 1; //months from 1-12
            const day = timeStamp.getUTCDate();
            const year = timeStamp.getUTCFullYear();
            const date = year + "/" + month + "/" + day;

            // Checks index of the day in the message history
            const dateIndexInMessageList = state.messagesHistory.findIndex(item => item.title == date)
            // If the day doesn't exist
            if (dateIndexInMessageList == -1) {
                // Sets new message id to 1
                newId = 1

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

                // Create new day
                const newDay = {
                    title: date,
                    data: [
                        newMessage
                    ]
                }

                // Update nextState
                nextState = {
                    ...state,
                    messagesHistory: [
                        newDay,
                        ...state.messagesHistory
                    ]
                }
            } else {
                // If the day exist in the message history

                // check if message is already in message history
                const messageIndex = state.messagesHistory[dateIndexInMessageList].data
                    .findIndex(item => item.messageReceivedId === messageReceivedId)

                // if message is not in history
                // add message
                if (messageIndex === -1) {
                    newId = state.messagesHistory[dateIndexInMessageList].data[0].id + 1
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
                        messagesHistory: state.messagesHistory.map((content, i) => i === dateIndexInMessageList ? {
                            title: date,
                            data: [
                                newMessage,
                                ...state.messagesHistory[dateIndexInMessageList].data
                            ]
                        } :
                            content)
                    }
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
            // grabs timestamp of the message and converts it in YY/MM//DD
            const acceptedTimeStamp = new Date(action.value.timeStamp)
            const acceptedMonth = acceptedTimeStamp.getUTCMonth() + 1; //months from 1-12
            const acceptedDay = acceptedTimeStamp.getDate();
            const acceptedYear = acceptedTimeStamp.getUTCFullYear();
            const acceptedDate = acceptedYear + "/" + acceptedMonth + "/" + acceptedDay;

            // Checks index of the day in the message history
            const acceptedDateIndexInMessageList = state.messagesHistory.findIndex(item => item.title == acceptedDate)
            nextState = {
                ...state,
                messagesHistory: state.messagesHistory.map((content, i) => {
                    if (i === acceptedDateIndexInMessageList) {
                        let data = content.data.map((item, i) => {
                            if (item.id == action.value.id) {
                                return contactRequestAcceptedMessage
                            } else {
                                return item
                            }
                        })
                        const dayWithAccepted = {
                            title: acceptedDate,
                            data
                        }
                        return dayWithAccepted
                    } else {
                        return content
                    }
                }),
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

            // grabs timestamp of the message and converts it in YY/MM//DD
            const declinedTimeStamp = new Date(action.value.timeStamp)
            const declinedMonth = declinedTimeStamp.getUTCMonth() + 1; //months from 1-12
            const declinedDay = declinedTimeStamp.getDate();
            const declinedYear = declinedTimeStamp.getUTCFullYear();
            const declinedDate = declinedYear + "/" + declinedMonth + "/" + declinedDay;

            // Checks index of the day in the message history
            const declinedDateIndexInMessageList = state.messagesHistory.findIndex(item => item.title == declinedDate)
            nextState = {
                ...state,
                messagesHistory: state.messagesHistory.map((content, i) => {
                    if (i === declinedDateIndexInMessageList) {
                        let data = content.data.map((item, i) => {
                            if (item.id == action.value.id) {
                                return contactRequestDeclinedMessage
                            } else {
                                return item
                            }
                        })
                        const dayWithDeclined = {
                            title: declinedDate,
                            data
                        }
                        return dayWithDeclined
                    } else {
                        return content
                    }
                }),
            }
            return nextState || state

        case 'ADD_CUSTOM_PREDEFINED_MESSAGE':
            const newCustomMessageId = state.predefinedMessagesList.slice(-1)[0].id + 1
            const newCustomMessage = {
                id: newCustomMessageId,
                title: action.value.title,
                sound: action.value.sound,
                soundName: action.value.soundName,
                messageFor: action.value.messageFor
            }
            nextState = {
                ...state,
                predefinedMessagesList: [
                    ...state.predefinedMessagesList,
                    newCustomMessage
                ]
            }
            return nextState || state

        case 'DELETE_CUSTOM_PREDEFINED_MESSAGE':
            const messageListWithoutDeletedMessage = state.predefinedMessagesList.filter(message => message.id !== action.value.id);
            nextState = {
                ...state,
                predefinedMessagesList: messageListWithoutDeletedMessage
            }
            return nextState || state

        case "RESET_MESSAGE_HISTORY":
            return initialState;

        default:
            return state
    }
}

export default displayMessagesList