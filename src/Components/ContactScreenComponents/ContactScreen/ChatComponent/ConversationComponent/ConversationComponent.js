/**
* Called by Chat Component
* Displays the Conversation component :
*  - Messages received 
*  - Messages sended
*  - Date
* Props : 
*  - N/A
*/

import React from 'react'
import { View, SectionList, Text } from 'react-native'
import styles from './styles'

import DisplayMessage from './DisplayMessage/DisplayMessage'
import SectionHeaderComponent from '../../../../MessageHistoryComponents/SectionHeader/SectionHeaderComponent'
//import CleanHistoryComponent from './CleanHistory/CleanHistoryComponent'

import { connect } from 'react-redux'
import { strings } from '../../../../../i18n'

class ConversationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conversationHistory: []
        }
    }
    componentWillMount = () => {
        this._grabbingConversationHistory()
    }

    renderListEmpty = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.list_empty}>{strings('message_history_screen.list_empty')}</Text>
                <Text style={styles.list_empty2}>{strings('message_history_screen.click_on_avatar')}</Text>
            </View>
        )
    }

    /**
     * Called on componentWillMount
     * Sorts current redux state of message history
     * Grabs only messages that concerns the current displayed contact
     * Modify current state with only the messages of the displayed contact
     * Flatlist uses the list defined in this state
     * 
     * Because message history in redux state is organized by [{ title(date), data: [ messages] }, { title(date), data: [ messages] }, etc], the function iterates over each object 
     * to grab the date then over each data(messages) array to grab messages from that day
     */
    _grabbingConversationHistory = () => {
        let contactConversation = []
        this.props.messagesHistory.forEach(day => {
            const title = day.title
            let data = []
            day.data.forEach(message => {
                if (this.props.contactDisplayed == message.contact) {
                    data.push(message)
                }
            })
            // if there is no message that day, returns doesn't push anything to the data array
            if (data.length > 0) {
                let newDay = { title, data }
                contactConversation.push(newDay)
            }
        })
        this.setState({ conversationHistory: contactConversation })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <SectionList
                    sections={this.state.conversationHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderSectionHeader={({ section }) => <SectionHeaderComponent section={section} />}
                    renderItem={({ item }) => <DisplayMessage message={item} />}
                    ListEmptyComponent={() => this.renderListEmpty()}
                    stickySectionHeadersEnabled={true}
                //ListHeaderComponent={<CleanHistoryComponent />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesHistory: state.displayMessagesList.messagesHistory,
        contactDisplayed: state.contactManagment.currentDisplayedContact[0]
    }
}

export default connect(mapStateToProps)(ConversationComponent)