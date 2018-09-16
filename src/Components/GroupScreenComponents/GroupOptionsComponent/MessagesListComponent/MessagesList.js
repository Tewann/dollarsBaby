//src\Components\GroupScreenComponents\GroupOptionsComponent\MessagesListComponent\MessagesList.js
//*
// Public Group - Created by user
// Or Privates Groups
// From GroupOptions
// Displays message list
//*

import React from 'react'
import { View, TextInput, FlatList, Text } from 'react-native'
import styles from './styles'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import { strings } from '../../../../i18n'

class MessagesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            additionnalMessage: "",
            errorMessage: null
        }
    }

    //*
    // Displays - Length of additionnal message
    //*
    _displayAdditionnalMessageLenght = () => {
        let length = this.state.additionnalMessage.length
        if (length <= 100) {
            return (
                <Text style={styles.additionnal_message_length}>{length}</Text>
            )
        } else {
            return (
                <Text style={styles.additionnal_message_length}>X</Text>
            )
        }
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
    _sendMessage = async (predefined_message, sound, groupType) => {
        if (this.state.additionnalMessage.length <= 100) {
            // Additional message length doesn't exceed 100
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
                groupType: groupType,
                groupName: this.props.currentGroup,
                sendBy: this.props.currentUser.name,
                predefined_message: predefined_message,
                additionalMessage: this.state.additionnalMessage,
                timeStamp: timeStamp,
                id: id,
                sound: sound
            })
                .then((res) => {
                    console.log(res)
                    // after function called
                    // updated redux store
                    const type = 'send'
                    const contact = this.props.currentGroup
                    const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type } }
                    this.props.dispatch(action)

                })
                .catch(httpsError => console.log(httpsError))            
        } else {
            // if additionnal message length exceed 100
            this.setState({ errorMessage: strings('groups_screen.group_options.messages_list.lenght_exceeded') })
        }

    }

    render() {
        return (
            <View elevation={1} style={styles.main_container}>
                {/* ------ Error messages ------*/}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', marginLeft: 7 }}>
                        {this.state.errorMessage}
                    </Text>}

                {/* ------ Text Input for additionnal message and counter ------*/}
                <View style={styles.TextInput_container}>
                    {this._displayAdditionnalMessageLenght()}
                    <TextInput
                        placeholder={strings('groups_screen.group_options.messages_list.placeholder')}
                        onChangeText={(text) => this._additionnalMessageChanged(text)}
                        style={styles.text_input}
                        underlineColorAndroid={'white'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                </View>

                {/* ------ Predefined group message list ------*/}
                <FlatList
                    data={this.props.predefinedMessagesList}
                    numColumns={2}
                    columnWrapperStyle={styles.message_flatlist}
                    keyboardShouldPersistTaps={'always'}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MessageItem
                        message={item}
                        sendMessage={(predefined_message, sound, groupType) => this._sendMessage(predefined_message, sound, this.props.type)}
                    />}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.groupManagment.predefinedGroupMessagesList,
        currentUser: state.getCurrentUserInformations,
        currentGroup: state.groupManagment.currentDisplayedGroup[0]
    }
}

export default connect(mapStateToProps)(MessagesList)