/**
 * Contact Screen component
 * Display the contact information, last messages and the ability to send messages
 */

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import HeaderComponent from './HeaderComponent/HeaderComponent'
import ChatComponent from './ChatComponent/ChatComponent'

class MessagesListScreen extends React.Component {
    _displayContactsList = () => {
        const action = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
        this.props.dispatch(action)
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                <HeaderComponent displayContactsList={() => this._displayContactsList()} />
                <ChatComponent displayContactsList={() => this._displayContactsList()} />
            </View>
        )
    }
}

export default connect()(MessagesListScreen)

