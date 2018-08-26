//src\Components\GroupScreenComponents\GroupOptionsComponent\PublicGroupOptionsCreatorComponent\PublicGroupOptionsCreator.js
//*
// Public Group - Created by user
// From GroupOptions
// Displays message list and change image profil option
//*

import React from 'react'
import { View, TextInput, FlatList, Text } from 'react-native'
import styles from './styles'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';

class PublicGroupOptionsCreator extends React.Component {
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
    _sendMessage = async (predefined_message) => {
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
                groupType: 'public',
                groupName: this.props.currentGroup,
                sendBy: this.props.currentUser.name,
                predefined_message: predefined_message,
                additionalMessage: this.state.additionnalMessage,
                timeStamp: timeStamp,
                id: id,
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
            /*
            const sendMessage = await sendMessageToFirestore(currentUser, contact, predefined_message, additionnal_message, timeStamp, id, type)
                .then(() => {
                    // if firebase function worked, update redux store
                    const type = 'send'
                    const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type } }
                    this.props.dispatch(action)
                    setTimeout(() => this.props.returnToContactScreen(), 500)
                })
                .catch(err => this.setState({ errorMessage: err }))
                */
        } else {
            // if additionnal message length exceed 100
            this.setState({ errorMessage: 'Le message a trop de caractères (100 maximum)' })
        }

    }

    render() {
        return (
            <View>
                {/* ------ Error messages ------*/}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', marginLeft: 7 }}>
                        {this.state.errorMessage}
                    </Text>}

                {/* ------ Text Input for additionnal message and counter ------*/}
                <View style={styles.TextInput_container}>
                    {this._displayAdditionnalMessageLenght()}
                    <TextInput
                        placeholder='Message 100 caractères maximum'
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
                        sendMessage={(predefined_message) => this._sendMessage(predefined_message)}
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

export default connect(mapStateToProps)(PublicGroupOptionsCreator)