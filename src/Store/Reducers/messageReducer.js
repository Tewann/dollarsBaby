// Store/Reducers/messageReducer.js
import { strings } from '../../i18n'

const initialState = {
    predefinedMessagesList: [
        {
            id: 1,
            title: 'Blink',
            sound: 's1blink',
            messageFor: 'All',
            responses: [
                { id: 1, name: 'Blink' }
            ]
        },
        {
            id: 2,
            title: strings('reducers.where'),
            sound: "s2tesou",
            messageFor: 'All',
            complements: [
                { id: 1, name: strings('reducers.critic') },
                { id: 2, name: strings('reducers.medium') },
                { id: 3, name: strings('reducers.low') },
                { id: 4, name: strings('reducers.position') }],
            responses: [
                { id: 1, name: strings('reducers.coming') },
                { id: 2, name: strings('reducers.at_home') },
                { id: 3, name: strings('reducers.at_work') },
                { id: 4, name: strings('reducers.position') }
            ]
        },
        {
            id: 3,
            title: strings('reducers.urgent'),
            sound: "s3urgent",
            messageFor: 'All',
            complements: [
                { id: 1, name: strings('reducers.critic') },
                { id: 2, name: strings('reducers.medium') },
                { id: 3, name: strings('reducers.low') }],
            responses: [
                { id: 1, name: strings('reducers.coming') },
                { id: 2, name: strings('reducers.calling_soon') },
                { id: 3, name: strings('reducers.not_available') },
            ]
        },
        {
            id: 4,
            title: strings('reducers.forget'),
            sound: "s4oubliepas",
            messageFor: 'All',
            complements: [
                { id: 1, name: strings('reducers.critic') },
                { id: 2, name: strings('reducers.medium') },
                { id: 3, name: strings('reducers.low') }],
            responses: [
                { id: 1, name: strings('reducers.dealing_with_it') },
                { id: 2, name: strings('reducers.done') },
            ]
        },
        {
            id: 5,
            title: strings('reducers.coming'),
            sound: "s5jarrive",
            messageFor: 'All',
            complements: [
                { id: 1, name: '>15 min' },
                { id: 2, name: '>30 min' },
                { id: 3, name: '>1h' },
                { id: 4, name: '<1h' },
                { id: 5, name: strings('reducers.position') }],
            responses: [
                { id: 1, name: 'Ok' }
            ]
        },
        {
            id: 6,
            title: strings('reducers.done'),
            sound: "s6cestfait",
            messageFor: 'All',
            responses: [
                { id: 1, name: 'Ok' }
            ]
        },
    ],

    customMessagesList: [],
    messagesReceived: [],
    messagesHistory: []
}

function displayMessagesList(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'MESSAGE_SENDED':
            let newMessageSend = null
            /*             // grabs timestamp of the message and converts it in YY/MM//DD
                        const sendTimeStamp = new Date(action.value.timeStamp)
                        const sendMonth = sendTimeStamp.getUTCMonth() + 1; //months from 1-12
                        const sendDay = sendTimeStamp.getUTCDate();
                        const sendYear = sendTimeStamp.getUTCFullYear();
                        const sendDate = sendYear + "/" + sendMonth + "/" + sendDay; */
            const idSend = action.value.contact + action.value.timeStamp + '_sended'

            // Checks if the contact or group has already messages
            const sendcontactOrGroupIndexInMessageList = state.messagesHistory.findIndex(item => item.title === action.value.contact && item.type === action.value.senderType)

            newMessageSend = {
                id: idSend,
                type: action.value.type,
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: action.value.additionnal_message,
                imageUri: action.value.imageUri,
                timeStamp: action.value.timeStamp,
            }
            // If the conversation doesn't exist
            if (sendcontactOrGroupIndexInMessageList == -1) {
                // Create new contact/group
                const newConversation = {
                    title: action.value.contact,
                    type: action.value.senderType,
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
                // If the conversation exists in the history : add message
                let newData = [
                    newMessageSend,
                    ...state.messagesHistory[sendcontactOrGroupIndexInMessageList].data
                ]

                nextState = {
                    ...state,
                    messagesHistory: state.messagesHistory.map((content, i) => i === sendcontactOrGroupIndexInMessageList ? {
                        title: action.value.contact,
                        type: action.value.senderType,
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
            const imageDownloadURL = action.value.get('imageDownloadUrl')
            const timeStamp = action.value.get('timeStamp')
            const type = action.value.get('type')
            const sendBy = action.value.get('sendBy')
            const senderType = action.value.get('senderType')
            const sendToGroup = action.value.get('displayName')
            const idReceived = contactOrGroup + timeStamp
            const sound = action.value.get('sound')

            // Create new message
            let newMessage = {
                id: idReceived,
                type: type,
                contact: contactOrGroup,
                predefined_message: predefined_message,
                additionnal_message: additionnal_message,
                imageUri: imageDownloadURL,
                timeStamp: timeStamp,
                messageReceivedId: messageReceivedId,
                sendBy: sendBy,
                toGroup: sendToGroup,
                sound: sound
            }

            // Checks if the contact or group has already messages
            const contactOrGroupIndexInMessageList = state.messagesHistory.findIndex(item => item.title == contactOrGroup && item.type == senderType)
            // If the conversation doesn't exist
            if (contactOrGroupIndexInMessageList === -1) {
                // Create new contact/group
                const newConversation = {
                    title: contactOrGroup,
                    type: senderType,
                    data: [
                        newMessage
                    ]
                }

                // Update nextState
                nextState = {
                    ...state,
                    messagesHistory: [
                        newConversation,
                        ...state.messagesHistory
                    ],
                    messagesReceived: [
                        newMessage,
                        ...state.messagesReceived
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
                    let newData = [
                        newMessage,
                        ...state.messagesHistory[contactOrGroupIndexInMessageList].data
                    ]

                    if (timeStamp < state.messagesHistory[contactOrGroupIndexInMessageList].data[0].timeStamp) {
                        newData.sort((a, b) => {
                            return a.timeStamp > b.timeStamp ? -1 : a.timeStamp < b.timeStamp ? 1 : 0;
                        })
                    }

                    //state.messagesReceived.push(newMessage)
                    nextState = {
                        ...state,
                        messagesHistory: state.messagesHistory.map((content, i) => i === contactOrGroupIndexInMessageList ? {
                            title: contactOrGroup,
                            type: senderType,
                            data: newData
                        } :
                            content),
                        messagesReceived: [
                            newMessage,
                            ...state.messagesReceived
                        ]
                    }
                }
            }
            if (state.messagesReceived.length > 40) {
                setTimeout(() => {
                    state.messagesReceived.pop()
                }, 1000)
            }
            return nextState || state

        case 'CONTACT_REQUEST_ACCEPTED':
            // called when contact request has been accepted
            // create new message with status accepted
            // uses same id for the message
            const contactRequestAcceptedMessage = {
                id: action.value.id,
                type: 'contact_request_response',
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: 'Accepted',
                timeStamp: action.value.timeStamp,
                messageReceivedId: action.value.messageReceivedId,
                status: 'accepted',
                sendBy: action.value.contact
            }
            nextState = {
                ...state,
                messagesReceived: state.messagesReceived.map((content, i) => {
                    if (content.id === action.value.id) {
                        return contactRequestAcceptedMessage
                    } else {
                        return content
                    }
                })
            }
            /* nextState = {
                ...state,
                messagesReceived: [
                    contactRequestAcceptedMessage,
                    ...state.messagesReceived                    
                ]
            } */
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
                type: 'contact_request_response',
                contact: action.value.contact,
                predefined_message: action.value.predefined_message,
                additionnal_message: 'Declined',
                timeStamp: action.value.timeStamp,
                messageReceivedId: action.value.messageReceivedId,
                status: 'declined',
                sendBy: action.value.contact
            }
            nextState = {
                ...state,
                messagesReceived: state.messagesReceived.map((content, i) => {
                    if (content.id === action.value.id) {
                        return contactRequestDeclinedMessage
                    } else {
                        return content
                    }
                })
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