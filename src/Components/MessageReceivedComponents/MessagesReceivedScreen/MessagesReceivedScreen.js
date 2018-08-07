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
                    data={this.props.messagesHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <DisplayMessage message={item}/>}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesHistory: state.displayMessagesList.messagesHistory
    }
}

export default connect(mapStateToProps)(MessagesReceivedScreen)