// src/Components/MessageHistoryComponents/MessageHistoryScreen.js
// main screen for messages received

import React from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import DisplayMessage from './DisplayMessage/DisplayMessage'
import { fetchMessages } from '../../Services/firebaseFunctions'

class MessageHistory extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMessages(this.props.currentUser.name))
    }

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
        messagesHistory: state.displayMessagesList.messagesHistory,
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(MessageHistory)