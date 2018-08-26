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
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => this.props.sendMessage(message)}
            >
                <Text style={styles.text}>
                    {message}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default MessageItem