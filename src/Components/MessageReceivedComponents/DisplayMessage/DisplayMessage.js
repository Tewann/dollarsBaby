// src/Components/MessageReceivedComponents/DisplayMessage/DisplayMessage.js
// Component : display each iteration of messages received

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

class DisplayMessage extends React.Component {
    render() {
        const { message } = this.props
        return (
            <View style={styles.main_container}>
                <Text style={styles.contact_name}>
                    Dieu
                </Text>
                <Text style={styles.predefined_message}>
                    {message.predefined_message}
                </Text>
                <Text style={styles.additionnal_message}>
                    {message.additionnal_message}
                </Text>
            </View>
        )
    }
}

export default DisplayMessage

