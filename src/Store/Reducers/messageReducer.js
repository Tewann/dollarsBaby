// Store/Reducers/messageReducer.js
import { strings } from '../../i18n'

const initialState = {
    predefinedMessagesList: [
        {
            id: 1,
            title: 'Blink',
            sound: 's1blink',
            messageFor: 'All'
        },
        {
            id: 2,
            title: strings('reducers.where'),
            sound: "s2tesou",
            messageFor: 'All'
        },
        {
            id: 3,
            title: strings('reducers.urgent'),
            sound: "s3urgent",
            messageFor: 'All'
        },
        {
            id: 4,
            title: strings('reducers.forget'),
            sound: "s4oubliepas",
            messageFor: 'All'
        },
        {
            id: 5,
            title: strings('reducers.coming'),
            sound: "s5jarrive",
            messageFor: 'All'
        },
        {
            id: 6,
            title: strings('reducers.done'),
            sound: "s6cestfait",
            messageFor: 'All'
        },
    ],

    customMessagesList: [],
    messagesReceived: [],
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

            // Checks if the contact or group has already messages
            const sendcontactOrGroupIndexInMessageList = state.messagesHistory.findIndex(item => item.title === action.value.contact)

            // If the conversation doesn't exist
            if (sendcontactOrGroupIndexInMessageList == -1) {
                // Sets new message id to 0
                newIdSend = 0
                // create new message
                newMessageSend = {
                    id: newIdSend,
                    type: action.value.type,
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp,
                }
                // Create new contact/group
                const newConversation = {
                    title: action.value.contact,
                    data: [
                        newMessageSend
                    ]
                }
                // Update nextState
                nextState = {
                    ...state,
                    messagesHistory: [
                        newConversation,
                        ...state.messagesHistory
                    ]
                }
            } else {
                // If the conversation exists in the history
                // add message
                newIdSend = state.messagesHistory[sendcontactOrGroupIndexInMessageList].data.length + 1
                // create new message
                newMessageSend = {
                    id: newIdSend,
                    type: action.value.type,
                    contact: action.value.contact,
                    predefined_message: action.value.predefined_message,
                    additionnal_message: action.value.additionnal_message,
                    timeStamp: action.value.timeStamp,
                }
                let newData = [
                    newMessageSend,
                    ...state.messagesHistory[sendcontactOrGroupIndexInMessageList].data
                ]
                nextState = {
                    ...state,
                    messagesHistory: state.messagesHistory.map((content, i) => i === sendcontactOrGroupIndexInMessageList ? {
                        title: action.value.contact,
                        data: newData
                    } :
                        content)
                }
            }
            return nextState || state

        case 'MESSAGE_RECEIVED':

            // get message values from firestore doc
            const contactOrGroup = action.value.get('title')
            const messageReceivedId = action.value.get('messageId')
            const predefined_message = action.value.get('predefined_message')
            const additionnal_message = action.value.get('additional_message')
            const timeStamp = action.value.get('timeStamp')
            const type = action.value.get('type')
            const sendBy = action.value.get('sendBy')
            let newId = null
            let newMessage = null

            // grabs timestamp of the message and converts it in YY/MM//DD
            //const timeStamp = new Date(timeStampForDate)
            /*             const month = timeStamp.getUTCMonth() + 1; //months from 1-12
                        const day = timeStamp.getUTCDate();
                        const year = timeStamp.getUTCFullYear();
                        const date = year + "/" + month + "/" + day; */


            // Checks if the contact or group has already messages
            const contactOrGroupIndexInMessageList = state.messagesHistory.findIndex(item => item.title == contactOrGroup)
            // If the conversation doesn't exist
            if (contactOrGroupIndexInMessageList === -1) {
                // Sets new message id to 0
                newId = 0

                // create new message
                newMessage = {
                    id: newId,
                    type: type,
                    contact: contactOrGroup,
                    predefined_message: predefined_message,
                    additionnal_message: additionnal_message,
                    timeStamp: timeStamp,
                    messageReceivedId: messageReceivedId,
                    sendBy: sendBy
                }

                // Create new contact/group
                const newConversation = {
                    title: contactOrGroup,
                    data: [
                        newMessage
                    ]
                }

                state.messagesReceived.push(newMessage)

                // Update nextState
                nextState = {
                    ...state,
                    messagesHistory: [
                        newConversation,
                        ...state.messagesHistory
                    ]
                }
            } else {
                // If the conversation exists in the history

                // check if message is already in  history
                const messageIndex = state.messagesHistory[contactOrGroupIndexInMessageList].data
                    .findIndex(item => item.messageReceivedId === messageReceivedId)

                // if message is not in history
                // add message
                if (messageIndex === -1) {
                    newId = state.messagesHistory[contactOrGroupIndexInMessageList].data.length + 1

                    // create new message
                    newMessage = {
                        id: newId,
                        type: type,
                        contact: contactOrGroup,
                        predefined_message: predefined_message,
                        additionnal_message: additionnal_message,
                        timeStamp: timeStamp,
                        messageReceivedId: messageReceivedId,
                        sendBy: sendBy
                    }

                    //const data = state.messagesHistory[contactOrGroupIndexInMessageList].data
                    //let newData = state.messagesHistory[contactOrGroupIndexInMessageList].data
                    /*                     const messageTimeStamp = data.length.timeStamp
                                        if (messageTimeStamp > timeStamp) {
                                            compare = (a, b) => {
                                                const timeStampA = a.timeStamp;
                                                const timeStampB = b.timeStamp;
                                                let comparaison = 0;
                                                if (timeStampA > timeStampB) {
                                                    comparaison = 1;
                                                } else if (timeStampA < timeStampB) {
                                                    comparaison = -1;
                                                }
                                                return comparaison;
                                            }
                                            console.log('called')
                                            newData.sort(compare)
                                        } */
                    //newData.unshift(newMessage)
                    let newData = [
                        newMessage,
                        ...state.messagesHistory[contactOrGroupIndexInMessageList].data
                    ]
                    state.messagesReceived.push(newMessage)
                    nextState = {
                        ...state,
                        messagesHistory: state.messagesHistory.map((content, i) => i === contactOrGroupIndexInMessageList ? {
                            title: contactOrGroup,
                            data: newData
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

            nextState = {
                ...state,
                messagesReceived: [
                    ...state.messagesReceived,
                    contactRequestAcceptedMessage
                ]
            }
            /*             // grabs timestamp of the message and converts it in YY/MM//DD
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
                        } */
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
            nextState = {
                ...state,
                messagesReceived: [
                    ...state.messagesReceived,
                    contactRequestDeclinedMessage
                ]
            }

            /* // grabs timestamp of the message and converts it in YY/MM//DD
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
            } */
            return nextState || state

        case 'DELETE_MESSAGE_HISTORY':
            const contactOrGroupName = action.value
            // messagesReceived = delete all history
            if (contactOrGroupName === 'messagesReceived') {
                nextState = {
                    ...state,
                    messagesReceived: []
                }
            } else {
                const contactOrGroupIndex = state.messagesHistory.findIndex(item => item.title === contactOrGroupName)
                nextState = {
                    ...state,
                    messagesHistory: state.messagesHistory.map((content, i) => i === contactOrGroupIndex ? {
                        title: contactOrGroupName,
                        data: []
                    } :
                        content)
                }
            }
            return nextState || state

        case 'ADD_CUSTOM_PREDEFINED_MESSAGE':
            const newCustomMessageId = state.predefinedMessagesList.slice(-1)[0].id + 1
            const newCustomMessage = {
                id: newCustomMessageId,
                title: action.value.title,
                sound: action.value.soundName,
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