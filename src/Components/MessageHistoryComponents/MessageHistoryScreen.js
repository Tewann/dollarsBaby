// src/Components/MessageHistoryComponents/MessageHistoryScreen.js
// main screen for messages received

import React from 'react'
import { View, FlatList, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import MessageComponent from '../MessageComponent/MessageComponent'

import { strings } from '../../i18n'

class MessageHistory extends React.Component {
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
                    data={this.props.messagesReceived}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <MessageComponent message={item} id={index} contactOrGroupIndex={0} navigate={this.props.navigation.navigate} type={'messagesHistory'} />}
                    ListEmptyComponent={() => this.renderListEmpty()}
                    ListFooterComponent={() => <Text style={styles.footerComponent}>{strings('message_history_screen.footertext')}</Text>}
                    initialNumToRender={15}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesReceived: state.displayMessagesList.messagesReceived,
    }
}

export default connect(mapStateToProps)(MessageHistory)