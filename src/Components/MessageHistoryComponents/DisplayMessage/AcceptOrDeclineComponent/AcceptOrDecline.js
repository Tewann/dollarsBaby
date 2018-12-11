// message display component
// when contact request message display accept or decline button

import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { addContactToFirestore, sendMessageToFirestore } from '../../../../Services/firebaseFunctions'
import { strings } from '../../../../i18n'

class AcceptOrDecline extends React.Component {

    _acceptContactRequest = async () => {
        // adds contact to both users contact lists
        const addContactToDatabase = await addContactToFirestore(this.props.currentUser.name, this.props.message.contact)

        // changes message status to current user redux store
        const action = { type: 'CONTACT_REQUEST_ACCEPTED', value: this.props.message }
        this.props.dispatch(action)

        // sends message to contact : contact request accepted
        // calls firebase function
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUser.name
        const contact = this.props.message.contact
        const predefined_message = `${currentUser}` + strings('message_history_screen.display_message.accept_or_decline.accepted')
        const additionnal_message = ""
        const id = `${currentUser}_${timeStamp}`
        const type = 'received'
        const sendAcceptedMessage = await sendMessageToFirestore(currentUser, contact, predefined_message, additionnal_message, timeStamp, id, type)
    }

    _declineContactRequest = () => {
        const action = { type: 'CONTACT_REQUEST_DECLINED', value: this.props.message }
        this.props.dispatch(action)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    style={styles.button_container}
                    onPress={() => this._acceptContactRequest()}
                >
                    <Text style={styles.button_text}>
                        {strings('message_history_screen.display_message.accept_or_decline.accept')}
                    </Text>
                </TouchableOpacity>
                <View style={styles.middle_bar} />
                <TouchableOpacity
                    style={styles.button_container}
                    onPress={() => this._declineContactRequest()}
                >
                    <Text style={styles.button_text}>
                        {strings('message_history_screen.display_message.accept_or_decline.refuse')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(AcceptOrDecline)