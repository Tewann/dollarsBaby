// src/Components/ContactScreenComponents/MessageItem/MessageItem.js
// Component: display each iteration of message list

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'



class MessageItem extends React.Component {

    // Sending messages
    // Reducer is dealing with getting additionnal message
    _sendMessage(predefined_message) {
        const action = { type: 'SEND_MESSAGE', value: predefined_message }
        this.props.dispatch(action)
        this.props.returnToContactScreen()   
    }

    render() {
        const message = this.props.message
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => this._sendMessage(message.title)}
            >
                <Text style={styles.text}>
                    {message.title}
                </Text>
            </TouchableOpacity>
        )
    }
}


export default connect()(MessageItem)