/**
* Called from Contact Screen
* Displays the chat component :
*  - text input to send messages
*  - predefined messages
*  - previous messages send and received
* Props : 
*  - displayContactsList : _displayContactsList() => function to navigate back to the contact screen
*/


import React from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './styles'

import MessageItem from './MessageItem/MessageItem'
import ConversationComponent from './ConversationComponent/ConversationComponent'

import { connect } from 'react-redux'
import { sendMessageToFirestore } from '../../../../Services/firebaseFunctions'
import { strings } from '../../../../i18n'
import { Icon } from 'react-native-elements';

import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
// const itemHeight = (height / 12)
const itemHeight = (height / 24)

class ChatComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            additionnalMessage: "",
            errorMessage: null,
            textInputHeight: 40,
            displayConversation: false
        }
    }

    componentDidMount = () => {
        this.setState({ displayConversation: true })
    }

    componentWillUnmount = () => {
        this.setState({ displayConversation: false})
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
        // reset error message
        this.setState({ errorMessage: null })
        // calls firebase function
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUser.name
        const contact = this.props.contact
        const additionnal_message = this.state.additionnalMessage
        const id = `${currentUser}_${timeStamp}`
        const type = 'received'
        const sendMessage = await sendMessageToFirestore(currentUser, contact, predefined_message, additionnal_message, timeStamp, id, type, sound)
            .then(() => {
                // if firebase function worked, update redux store
                const type = 'send'
                const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type } }
                this.props.dispatch(action)
                setTimeout(() => this.props.displayContactsList(), 500)
            })
            .catch(err => this.setState({ errorMessage: err }))
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

    _displayConversation = () => {
        if (this.state.displayConversation == false) {
            return (
                <ActivityIndicator
                    style={{ flex: 1 }}
                    size='large'
                />
            )
        } else {
            return (
                <ConversationComponent />
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', marginLeft: 7 }}>
                        {this.state.errorMessage}
                    </Text>}
                <View style={[styles.TextInput_container, { marginRight: this.state.additionnalMessage == "" ? 7 : 0 }]}>
                    <TextInput
                        placeholder={strings('contacts_screen.messages_list_screen.placeholder')}
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
                <View>
                    <FlatList
                        data={this.props.predefinedMessagesList}
                        numColumns={3}
                        columnWrapperStyle={styles.flatlist}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MessageItem message={item}
                            sendMessage={(predefined_message, sound) => this._sendMessage(predefined_message, sound)}
                            contact={this.props.contact}
                        />}
                    />
                </View>
                {this._displayConversation()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        currentUser: state.getCurrentUserInformations,
        contact: state.contactManagment.currentDisplayedContact[0],
    }
}

export default connect(mapStateToProps)(ChatComponent)

