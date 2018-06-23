// src/Components/MessageReceivedComponentsMessagesReceivedScreen/MessagesReceivedScreen.js
// main screen for messages received

import React from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import DisplayMessage from '../DisplayMessage/DisplayMessage'

class MessagesReceivedScreen extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.props.messagesReceived}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <DisplayMessage message={item}/>}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesReceived: state.displayMessagesList.messagesReceived
    }
}

export default connect(mapStateToProps)(MessagesReceivedScreen)