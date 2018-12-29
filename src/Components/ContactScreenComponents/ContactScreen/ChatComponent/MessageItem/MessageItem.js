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
        return (
            <TouchableOpacity
                onPress={() => this.props.sendMessage(message, sound)}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    colors={[ 'lightgrey', 'lightgrey']}
                    style={styles.main_container}
                >
                    <Text style={styles.text}>
                        {message}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default MessageItem