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

import LinearGradient from 'react-native-linear-gradient'


class MessageItem extends React.Component {

    render() {
        const message = this.props.message.title
        const sound = this.props.message.sound
        console.log(this.props.message)
        if (this.props.message.messageFor === 'All' || this.props.message.messageFor === 'Contacts') {
            return (
                <TouchableOpacity
                    onPress={() => this.props.sendMessage(message, sound)}
                    style={{ flex: 1 }}
                >
                    <LinearGradient
                        colors={[ '#07416b', '#07416b']}
                        style={styles.main_container}
                    >
                        <Text style={styles.text}>
                            {message}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        } else {
            return null
        }

    }
}

export default MessageItem