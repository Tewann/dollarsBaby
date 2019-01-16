/**
* Called from ConversationComponent flatlist
* Displays DisplayMessage :
*  - contact avatar
*  - predefined and additionnal message
* Props : 
*  - message => item from the flatlist
*/

import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'

import { connect } from 'react-redux'

class DisplayMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../../../images/ic_tag_faces.png')
        }
    }

    _renderImage = () => {
        let uri = null
        
        if (this.props.message.type == 'send') {
            // If the message is sended by the current user => grabs the user profil picture link in current global state
            uri = this.props.currentUserProfilPicture
        } else {
            // If the message is received => grabs profil picture from contact list in global state
            const contactNameIndex = this.props.contactList.findIndex(item =>
                item.name === this.props.message.contact)
            uri = (contactNameIndex !== -1) ? this.props.contactList[contactNameIndex].photoUrl : null
        }

        if (uri === null) {
            // If the contact/currentUser does not have a specific avatar picture => return default picture
            return (
                <Image
                    source={this.state.defaultPicture}
                    style={styles.rounds}
                />
            )
        } else {
            // Return specific contact/currentUser picture
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

    _renderTime() {
        let displayDate = ''
        // get timestamp from message
        // convert timestamp into hour, minute
        const timeStamp = this.props.message.timeStamp
        const hour = new Date(timeStamp).getHours()
        const minute = new Date(timeStamp).getMinutes()

        // If hour/minute < 10 => add 0 before the hour/minute number to always display two numbers ('OX' / 'XX')
        displayHour = hour < 10 ? `0${hour}` : hour
        displayMinute = minute < 10 ? `0${minute}` : minute
        displayDate = `${displayHour}:${displayMinute}`

        return (
            <View style={styles.time_container}>
                <Text style={styles.time}>{displayDate}</Text>
            </View>
        )
    }

    _renderMessages() {
        if (this.props.message.type !== 'contact_request') {
            return (
                <View>
                    {
                        this.props.message.predefined_message != (null || undefined) &&
                        <Text
                            style={styles.predefined_message}
                        //style={this.props.message.type === 'send' ? [styles.predefined_message, { color: 'white'}] : [styles.predefined_message]}
                        >
                            {this.props.message.predefined_message}
                        </Text>
                    }
                    {
                        this.props.message.additionnal_message != "" &&
                        <Text
                            style={styles.additional_message}
                            //style={this.props.message.type === 'send' ? [styles.additional_message, { color: 'white'}] : [styles.additional_message]}
                            >
                            {this.props.message.additionnal_message}
                        </Text>
                    }
                </View>
            )
        }
    }



    _renderMessageContainer = (message) => {
        if (this.props.message.type === 'send') {
            // Message send
            return (
                <View style={styles.renderMessage_send_main_container}>
                    {this._renderTime()}
                    <View style={styles.send_both_messages_container}>
                        {this._renderMessages()}
                    </View>
                    <View style={styles.image_container}>
                        {this._renderImage()}
                    </View>
                </View>

            )
        } else {
            // Message received
            return (
                <View style={styles.renderMessage_main_container}>
                    <View style={styles.image_container}>
                        {this._renderImage()}
                    </View>
                    <View style={styles.both_messages_container}>
                        {this._renderMessages()}
                    </View>
                    {this._renderTime()}
                </View>

            )
        }

    }

    render() {
        const { message } = this.props
        return (
            <View style={styles.main_container}>
                {this._renderMessageContainer(message)}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        currentUserProfilPicture: state.getCurrentUserInformations.userProfilPicture,
    }
}

export default connect(mapStateToProps)(DisplayMessage)

