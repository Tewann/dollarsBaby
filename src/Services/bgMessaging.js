import firebase from 'react-native-firebase'
import Store from '../Store/configureStore'

export default async (message) => {
    // If FCM data.type is group photo updated
    // Calls GROUP_PHOTO_UPDATED reducer
    if (message.data.type === 'GROUP_PHOTO_UPDATED') {
        const groupName = message.data.groupName
        const dlURL = message.data.URL
        const PhotoName = message.data.PhotoName
        const action = {
            type: 'GROUP_PHOTO_UPDATED',
            value: { groupName, dlURL, PhotoName }
        }
        Store.props.dispatch(action)
    } else if (message.data.type === 'NEW_PRIVATE_GROUP_CONTACT') {
        const contactName = message.data.contactName
        const groupName = message.data.groupName
        const action = {
            type: 'NEW_PRIVATE_GROUP_CONTACT',
            value: { contactName, groupName }
        }
        Store.props.dispatch(action)
    } else {
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
    }
    return Promise.resolve
}