import firebase from 'react-native-firebase'
import Store from '../Store/configureStore'

export default async (message) => {
    const messageId = message.data.messageId
    const contact = message.data.contact
    const predefined_message = message.data.predefined_message
    const additional_message = message.data.additional_message
    const timeStamp = Number(message.data.timeStamp)
    const messageStatus = message.data.type
        const action_FCM_onMessage = {
        type: 'MESSAGE_RECEIVED_FROM_FCM',
        value: { messageId, contact, predefined_message, additional_message, timeStamp, messageStatus }
    }
    Store.dispatch(action_FCM_onMessage)
    return Promise.resolve
}