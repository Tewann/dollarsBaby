// src/Components/GroupScreenComponents/MessageItem/MessageItem.js
//*
// Component - Message item for groups
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
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => this.props.sendMessage(message, sound)}
            >
                <Text style={styles.text}>
                    {message}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default MessageItem