// src/Components/MessageHistoryComponents/MessageHistoryScreen.js
// main screen for messages received

import React from 'react'
import { View, SectionList, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import DisplayMessage from './DisplayMessage/DisplayMessage'
import SectionHeaderComponent from './SectionHeader/SectionHeaderComponent'
import CleanHistoryComponent from './CleanHistory/CleanHistoryComponent'
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
                <SectionList
                    sections={this.props.messagesHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderSectionHeader={({ section }) => <SectionHeaderComponent section={section} />}
                    renderItem={({ item }) => <DisplayMessage message={item} navigate={this.props.navigation.navigate} />}
                    ListEmptyComponent={() => this.renderListEmpty()}
                    stickySectionHeadersEnabled={true}
                    initialNumToRender={2}
                //ListHeaderComponent={<CleanHistoryComponent />}
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