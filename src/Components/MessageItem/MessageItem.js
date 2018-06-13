//Components/MessageItem/MessageItem.js
//Component: display each iteration of message list

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class MessageItem extends React.Component {
    render() {
        const message = this.props.message
        return (
            <TouchableOpacity
                style={styles.main_container}
            >
                <Text>{message.title}</Text>
            </TouchableOpacity>
        )
    }
}

export default MessageItem