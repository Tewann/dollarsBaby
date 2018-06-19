// src/Components/ContactScreenComponents/MessageItem/MessageItem.js
// Component: display each iteration of message list

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'



class MessageItem extends React.Component {

    //Sending messages
    _sendMessages(message) {
        const action = { type: 'SEND_MESSAGE', value: message }
        this.props.dispatch(action)
    }

    render() {
        const message = this.props.message
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPressIn={() => this._sendMessages(message.title)}
            >
                <Text style={styles.text}>
                    {message.title}</Text>
            </TouchableOpacity>
        )
    }
}

export default connect()(MessageItem)