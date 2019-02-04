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
import { View, FlatList, Text } from 'react-native'
import styles from './styles'

import DisplayMessage from './DisplayMessage/DisplayMessage'
//import CleanHistoryComponent from './CleanHistory/CleanHistoryComponent'

import { connect } from 'react-redux'
import { strings } from '../../../../../i18n'

class ConversationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupIndexInMessageHistory: null,
            stoploop: false,
        }
    }

    componentWillMount = () => {
        // Gets the contact index in the message history, so flatlist data displays only messages related to the contact       
        const groupIndex = this.props.messagesHistory.findIndex(item => item.title === this.props.currentGroup)
        this.setState({ groupIndexInMessageHistory: groupIndex })
    }

    componentWillUpdate() {
        if (!this.state.stoploop) {
            const groupIndex = this.props.messagesHistory.findIndex(item => item.title === this.props.currentGroup)
            this.setState({ groupIndexInMessageHistory: groupIndex, stoploop: true })
        }
    }



    render() {
        return (
            <View style={styles.main_container}>
                {
                    this.state.groupIndexInMessageHistory !== -1 &&
                    <FlatList
                        inverted={true}
                        data={this.props.messagesHistory[this.state.groupIndexInMessageHistory].data}
                        keyExtractor={(item, id) => item.id.toString()}
                        renderItem={({ item, index }) => <DisplayMessage message={item} id={index} groupIndex={this.state.groupIndexInMessageHistory} />}
                        //                ListEmptyComponent={() => this.renderListEmpty()}
                        initialNumToRender={15}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                }
                {
                    this.state.groupIndexInMessageHistory === -1 &&
                    <View style={{ flex: 1 }}>
                        <Text style={styles.list_empty}>{strings('groups_screen.group_screen.list_empty')}</Text>
                        <Text style={styles.list_empty2}>{strings('groups_screen.group_screen.click_on_avatar')}</Text>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesHistory: state.displayMessagesList.messagesHistory,
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
    }
}

export default connect(mapStateToProps)(ConversationComponent)