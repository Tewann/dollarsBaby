// src/Components/ContactScreenComponents/MessageItem/MessageItem.js
//*
// Component - Message item for contacts
// Displays each iteration of predefined message list
// Props : 
//  - message item (predefined message)
//  - sendMessage()
//* 

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class MessageItem extends React.Component {
    render() {
        const message = this.props.message.title
        const sound = this.props.message.sound
        if (this.props.message.messageFor === 'All' || this.props.message.messageFor === 'Contacts') {
            return (
                <TouchableOpacity
                    onPress={() => this.props.sendMessage(message, sound)}
                    style={styles.main_container}
                >
                    <Text style={styles.text}>
                        {message}
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }

    }
}

export default MessageItem