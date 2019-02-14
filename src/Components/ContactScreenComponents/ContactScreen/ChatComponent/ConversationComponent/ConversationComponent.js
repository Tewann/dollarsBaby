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
import { View, FlatList, Text, ScrollView } from 'react-native'
import styles from './styles'

import DisplayMessage from './DisplayMessage/DisplayMessage'
//import CleanHistoryComponent from './CleanHistory/CleanHistoryComponent'

import { connect } from 'react-redux'
import { strings } from '../../../../../i18n'

class ConversationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactIndexInMessageHistory: null,
            stoploop: false,
        }
    }

    componentWillMount = () => {
        // Gets the contact index in the message history, so flatlist data displays only messages related to the contact       
        const contactIndex = this.props.messagesHistory.findIndex(item => item.title === this.props.contactDisplayed)
        this.setState({ contactIndexInMessageHistory: contactIndex })
    }

    componentWillUpdate() {
        if (!this.state.stoploop) {
            const contactIndex = this.props.messagesHistory.findIndex(item => item.title === this.props.contactDisplayed)
            this.setState({ contactIndexInMessageHistory: contactIndex, stoploop: true })
        }
    }



    render() {
        /*         console.log(this.state.contactIndexInMessageHistory)
                if (this.props.messagesHistory[this.state.contactIndexInMessageHistory] === undefined) {
                    console.log(this.props.messagesHistory)
                } else {
                console.log(this.props.messagesHistory[this.state.contactIndexInMessageHistory].data)
                } */
        return (
            <View style={styles.main_container}>
                {
                    this.state.contactIndexInMessageHistory !== -1 &&
                    //this.props.messagesHistory[this.state.contactIndexInMessageHistory] !== undefined &&
                    <FlatList
                        inverted={true}
                        data={this.props.messagesHistory[this.state.contactIndexInMessageHistory].data}
                        keyExtractor={(item, id) => item.id.toString()}
                        renderItem={({ item, index }) => <DisplayMessage message={item} id={index} contactIndex={this.state.contactIndexInMessageHistory} />}
                        //                ListEmptyComponent={() => this.renderListEmpty()}
                        initialNumToRender={15}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                }
                {
                    this.state.contactIndexInMessageHistory === -1 &&
                    //this.props.messagesHistory[this.state.contactIndexInMessageHistory] === undefined &&
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={styles.list_empty}>{strings('message_history_screen.list_empty')}</Text>
                        <Text style={styles.list_empty2}>{strings('message_history_screen.click_on_avatar')}</Text>
                    </ScrollView>
                }


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