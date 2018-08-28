import firebase from 'react-native-firebase'
import Store from '../Store/configureStore'

export default async (message) => {
    // If FCM data.type is group photo updated
    // Calls GROUP_PHOTO_UPDATED reducer
    if (message.data.type === 'GROUP_PHOTO_UPDATED') {
        const groupName = message.groupName
        const dlURL = message.URL
        const PhotoName = message.PhotoName
        const group_photo_updated = {
            type: 'GROUP_PHOTO_UPDATED',
            value: { groupName, dlURL, PhotoName }
        }
        Store.props.dispatch(group_photo_updated)
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