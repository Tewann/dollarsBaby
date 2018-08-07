// src/Components/ContactScreenComponents/MessageItem/MessageItem.js
// Component: display each iteration of message list

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'




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


export default connect()(MessageItem)