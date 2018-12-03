// src/Components/MessageHistoryComponents/MessageHistoryScreen.js
// main screen for messages received

import React from 'react'
import { View, FlatList, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import DisplayMessage from './DisplayMessage/DisplayMessage'
import { fetchMessages } from '../../Services/firebaseFunctions'
import { strings } from '../../i18n'

class MessageHistory extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMessages(this.props.currentUser.name))
    }

    renderListEmpty = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.list_empty}>{strings('message_history_screen.list_empty')}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.props.messagesHistory}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => this.renderListEmpty()}
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