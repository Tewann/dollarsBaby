//*
// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Group Option Component
// Called by group screen
// Displays group name, photo and messages to send (if user has created group)
//*


import React from 'react'
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MessageItem from './MessageItem/MessageItem'
import firebase from 'react-native-firebase';

import { strings } from '../../../../i18n'
import ConversationComponent from './ConversationComponent/ConversationComponent';


class ChatComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            additionnalMessage: "",
            errorMessage: null,
            groupType: null,
            groupNameIndex: null,
            groupCreatorIsCurrentUser: false,
        }
    }

    componentWillMount = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        const groupType = this.props.groupList[groupNameIndex].type
        const groupCreatorIsCurrentUser = this.props.groupList[groupNameIndex].creator === this.props.currentUser.name
        this.setState({ groupType: groupType, groupNameIndex: groupNameIndex, groupCreatorIsCurrentUser: groupCreatorIsCurrentUser })
        if (groupType === 'private' || groupCreatorIsCurrentUser) {
            const hideAdsAction = { type: 'AD_BANNER', value: false}
            this.props.dispatch(hideAdsAction)
        }
    }

    componentWillUnmount = () => {
        const displaysAdsAction = { type: 'AD_BANNER', value: true}
        this.props.dispatch(displaysAdsAction)
    }

    //*
    // Update state when text input for additionnal message is modified
    //*
    _additionnalMessageChanged(text) {
        this.setState({ additionnalMessage: text })
    }

    //*
    // Send message by calling firebase function
    // Checks if additionnal message length is under 100 caracters
    // Then calls firebase function
    //*
    _sendMessage = async (predefined_message, sound) => {
        // Reset error message
        this.setState({ errorMessage: null })
        // Calls firebase function
        // prepares payload
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUser.name
        const contact = this.props.currentGroup
        const additionnal_message = this.state.additionnalMessage
        const id = `${currentUser}_${timeStamp}`
        const type = 'send'
        // invok function
        const httpsCallable = firebase.functions().httpsCallable('messageSendToGroup')
        httpsCallable({
            groupType: this.props.type,
            groupName: this.props.currentGroup,
            sendBy: this.props.currentUser.name,
            predefined_message: predefined_message,
            additionalMessage: this.state.additionnalMessage,
            timeStamp: timeStamp,
            id: id,
            sound: sound
        })
            .then((res) => {
                // after function called
                // updated redux store
                const type = 'send'
                const contact = this.props.currentGroup
                const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type } }
                this.props.dispatch(action)
            })
            .catch(httpsError => console.log('httpsCallable err' + httpsError))
    }

    _renderIcon = () => {
        if (this.state.additionnalMessage !== "") {
            return (
                <TouchableOpacity
                    style={styles.send_icon_container}
                    onPress={() => { this._sendMessage(predefined_message = null, sound = 's1blink') }
                    }
                >
                    <Icon name='md-send'
                        type='ionicon'
                        color='#88b097'
                    />
                </TouchableOpacity>
            )
        }
    }

    displayPredefinedMessageList = () => {
        if (this.state.groupType === 'private' || this.state.groupCreatorIsCurrentUser) {
            return (
                <View>
                    {/* ------ Error messages ------*/}
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', marginLeft: 7 }}>
                            {this.state.errorMessage}
                        </Text>}

                    {/* ------ Text Input for additionnal message ------*/}
                    <View style={[styles.TextInput_container, { marginRight: this.state.additionnalMessage == "" ? 7 : 0 }]}>
                        <TextInput
                            placeholder={strings('groups_screen.group_options.messages_list.placeholder')}
                            onChangeText={(text) => this._additionnalMessageChanged(text)}
                            multiline={true}
                            style={[styles.text_input, { height: Math.min(85, this.state.textInputHeight) }]}
                            underlineColorAndroid={'white'}
                            autoCorrect={true}
                            ref={component => this.messageInput = component}
                            onContentSizeChange={(event) => {
                                this.setState({ textInputHeight: event.nativeEvent.contentSize.height })
                            }}
                        />
                        {this._renderIcon()}
                    </View>
                    {/* ------ Predefined group message list ------*/}
                    <View style={{ paddingBottom: 5 }}>
                        <FlatList
                            data={this.props.predefinedMessagesList}
                            numColumns={3}
                            columnWrapperStyle={styles.flatlist}
                            keyboardShouldPersistTaps={'handled'}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MessageItem message={item}
                                sendMessage={(predefined_message, sound) => this._sendMessage(predefined_message, sound)}
                            />}
                        />
                    </View>
                </View>
            )
        } else {
            return null
        }
    }

    _displayConversation = () => {
        return (
            <ConversationComponent />
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayConversation()}
                {this.displayPredefinedMessageList()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
        currentUser: state.getCurrentUserInformations,
        groupList: state.groupManagment.groupList,
        currentDisplayedGroupScreen: state.groupManagment.currentDisplayedGroupScreen
    }
}

export default connect(mapStateToProps)(ChatComponent)
