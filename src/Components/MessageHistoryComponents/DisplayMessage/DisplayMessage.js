// src/Components/MessageHistoryComponents/DisplayMessage/DisplayMessage.js
// Component : display each iteration of messages received

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { connect } from 'react-redux'
import AcceptOrDecline from './AcceptOrDeclineComponent/AcceptOrDecline'
import { strings } from '../../../i18n'

class DisplayMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png')
        }
    }

    /**
     * Navigate to the contact scree when pressing the image
     * If the contact does not exist in the contact list, doesn't do anything
     */
    _navigateToContact() {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.message.contact)
        if (contactNameIndex !== -1) {
            const action = { type: 'SWITCH_CONTACT_SCREEN', value: this.props.message.contact }
            this.props.dispatch(action)
            this.props.navigate('ContactsScreen')
        }
    }

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.message.contact)
        let uri = (contactNameIndex !== -1) ? this.props.contactList[contactNameIndex].photoUrl : null
        if (this.props.message.type === 'send_contact_request' || this.props.message.type === 'contact_request' || uri === null) {
            // if message is type contact request (send or received)
            // or if contact does not have an image uploaded to storage
            // return default picture
            return (
                <Image
                    source={this.state.defaultPicture}
                    style={styles.rounds}
                />
            )
        } else {
            // else return contact image
            return (
                <ImageCacheProvider
                    ImageCacheManagerOptions={{ ttl: 100 }}>
                    <CachedImage
                        source={{ uri: uri }}
                        style={styles.rounds}
                    />
                </ImageCacheProvider>
            )
        }
    }

    _renderReceivedMessage() {
        if (this.props.message.type === 'contact_request' &&
            this.props.message.status !== 'accepted' && this.props.message.status !== 'declined') {
            // if message is contact request received displays customize predefined message
            return (
                <View style={styles.both_messages_container}>
                    <Text style={styles.predefined_message}>
                        {this.props.message.contact} {strings('message_history_screen.display_message.contact_request')}
                    </Text>
                    <AcceptOrDecline message={this.props.message} />
                </View>
            )
        } else if (this.props.message.type !== 'contact_request') {
            return (
                <View style={styles.both_messages_container}>
                    {
                        this.props.message.predefined_message != (null || undefined) &&
                        <Text style={styles.predefined_message}>
                            {this.props.message.predefined_message}
                        </Text>
                    }
                    {
                        this.props.message.additionnal_message != "" &&
                        <Text style={styles.additionnal_message}>
                            {this.props.message.additionnal_message}
                        </Text>
                    }
                </View>
            )
        }
    }

    _renderSendPredefinedMessage() {
        if (this.props.message.type === 'contact_request' &&
            this.props.message.status !== 'accepted' && this.props.message.status !== 'declined') {
            // if message is contact request received displays customize predefined message
            return (
                <Text style={styles.predefined_message}>
                    {this.props.message.contact} {strings('message_history_screen.display_message.contact_request')}
                </Text>
            )
        } else if (this.props.message.type !== 'contact_request') {
            return (
                <View style={styles.send_both_messages_container}>
                    {
                        this.props.message.predefined_message != (null || undefined) &&
                        <Text style={styles.predefined_message}>
                            {this.props.message.predefined_message}
                        </Text>
                    }
                    {
                        this.props.message.additionnal_message != "" &&
                        <Text style={styles.send_additionnal_message}>
                            {this.props.message.additionnal_message}
                        </Text>
                    }
                </View>
            )
        }
    }
    // buttons to accept or decline contact request invite
    _renderResponseToContactRequest() {
        // if message is type contact request and
        // request' status is pendant
        // displays accept or decline buttons
        // else returns nothing

        if (this.props.message.type === 'contact_request' &&
            this.props.message.status !== 'accepted' && this.props.message.status !== 'declined') {
            return (
                <AcceptOrDecline message={this.props.message} />
            )
        } else if (this.props.message.status === 'accepted') {
            return (
                <View style={styles.both_messages_container}>
                    <Text style={styles.send_additionnal_message}>{this.props.message.contact} {strings('message_history_screen.display_message.contact_added')}</Text>
                </View>
            )
        } else if (this.props.message.status === 'declined') {
            return (
                <View style={styles.both_messages_container}>
                    <Text style={styles.send_additionnal_message}>{this.props.message.contact} {strings('message_history_screen.display_message.contact_denied')}</Text>
                </View>
            )
        }
    }
    // display time
    _renderTime() {
        let displayDate = ''
        // get timestamp from message
        // convert timestamp into hour, minute
        const timeStamp = this.props.message.timeStamp
        const hour = new Date(timeStamp).getHours()
        const minute = new Date(timeStamp).getMinutes()

        // if day of displaying is day of timestamp message
        // display hour:min
        displayHour = hour < 10 ? `0${hour}` : hour
        displayMinute = minute < 10 ? `0${minute}` : minute
        displayDate = `${displayHour}:${displayMinute}`

        return (
            <View style={styles.time_container}>
                <Text style={styles.time}>{displayDate}</Text>
            </View>
        )
    }

    _renderMessage = (message) => {
        if (this.props.message.type === 'send' || this.props.message.type === 'send_contact_request') {
            return (
                <View>
                    <View style={styles.name_and_time}>
                        {this._renderTime()}
                        <Text>envoyé à </Text>
                        <Text style={styles.contact_name}>
                            {message.contact}
                        </Text>
                    </View>
                    <View style={styles.renderMessage_send_main_container}>
                        {this._renderSendPredefinedMessage()}
                        {this._renderResponseToContactRequest()}
                        <TouchableOpacity
                            style={styles.image_container}
                            onPress={() => this._navigateToContact()}
                        >
                            {this._renderImage()}
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            // Message received
            return (
                <View>
                    <View style={styles.name_and_time}>
                        {this._renderTime()}
                        <Text style={styles.contact_name}>
                            {message.contact}
                        </Text>
                    </View>
                    <View style={styles.renderMessage_main_container}>
                        <TouchableOpacity
                            style={styles.image_container}
                            onPress={() => this._navigateToContact()}
                        >
                            {this._renderImage()}
                        </TouchableOpacity>
                        {this._renderReceivedMessage()}
                        {this._renderResponseToContactRequest()}
                    </View>
                </View>
            )
        }

    }

    render() {
        const { message } = this.props
        return (
            <View style={styles.main_container}>
                {this._renderMessage(message)}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(DisplayMessage)

