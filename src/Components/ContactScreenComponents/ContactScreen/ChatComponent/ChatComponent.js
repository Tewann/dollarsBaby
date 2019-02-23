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
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import styles from './styles'

import MessageItem from './MessageItem/MessageItem'
import ConversationComponent from './ConversationComponent/ConversationComponent'

import { connect } from 'react-redux'
import { sendMessageToFirestore, uploadImageForMessagesToFirebase } from '../../../../Services/firebaseFunctions'
import { strings } from '../../../../i18n'
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'

var options = { quality: 0.1 };

class ChatComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            additionnalMessage: "",
            errorMessage: null,
            textInputHeight: 40,
            displayConversation: false,
            displayAttachement: true,
            displayCameraLibraryButtons: false,
            imageUri: null
        }
    }

    componentDidMount = () => {
        this.setState({ displayConversation: true })
    }



    //*
    // Update state when text input for additionnal message is modified
    //*
    _additionnalMessageChanged(text) {
        this.setState({ additionnalMessage: text })
    }

    //*
    // Send message by calling firebase function
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
        const imageUri = this.state.imageUri
        let imageDownloadUrl = null

        // Update redux store
        const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type: 'send', senderType: 'contact', imageUri } }
        this.props.dispatch(action)
        this.messageInput.clear()
        this.setState({ additionnalMessage: "", imageUri: null, displayAttachement: true, displayCameraLibraryButtons: false })

        // If an image has been selected to be send, upload it to firebase, grabs download url and sends it to the contact
        if (imageUri != (null || undefined)) {
            const senderType = 'contact'
            const downloadUrl = await uploadImageForMessagesToFirebase(currentUser, imageUri, senderType)
                .then()
                .catch(err => this.setState({ errorMessage: err }))
            imageDownloadUrl = { uri: downloadUrl }
        }

        // Send message
        await sendMessageToFirestore(currentUser, contact, predefined_message, additionnal_message, timeStamp, id, type, sound, imageDownloadUrl)
            .catch(err => this.setState({ errorMessage: err }))
    }

    _renderIcon = () => {
        if (this.state.additionnalMessage !== "" || this.state.imageUri !== null) {
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
    _renderAttachmentButtons = () => {
        if (this.state.displayAttachement) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({ displayAttachement: false, displayCameraLibraryButtons: true })}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                    <Icon
                        name='ios-attach'
                        type='ionicon'
                        size={30}
                    />
                </TouchableOpacity >
            )
        } else if (this.state.displayCameraLibraryButtons) {
            return (
                <View style={{ flexDirection: 'row', paddingLeft: 4, paddingRight: 4 }} >
                    <TouchableOpacity
                        onPress={() => this._openImageLibrary()}
                        style={{ paddingRight: 10 }}
                    >
                        <Icon
                            name='ios-images'
                            type="ionicon"
                            size={45}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._openCamera()}
                    >
                        <Icon
                            name='ios-camera'
                            type="ionicon"
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _openImageLibrary = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return
            }
            else if (response.error) {
                this.setState({ errorMessage: response.error })
                return
            }
            else {
                let requireSource = { uri: response.uri }
                this.setState({ imageUri: requireSource, displayCameraLibraryButtons: false, displayAttachement: true })
            }
        });
    }

    _openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                return
            }
            else if (response.error) {
                this.setState({ errorMessage: response.error })
                return
            }
            else {
                let requireSource = { uri: response.uri }
                this.setState({ imageUri: requireSource, displayCameraLibraryButtons: false, displayAttachement: true })
            }
        });
    }

    _renderImageToSend = () => {
        if (this.state.imageUri) {
            return (
                <View style={styles.image_container}>
                    <Image
                        source={this.state.imageUri}
                        style={styles.image}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._displayConversation()}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', marginLeft: 7 }}>
                        {this.state.errorMessage}
                    </Text>}
                {this._renderImageToSend()}
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
                    {this._renderAttachmentButtons()}
                    {this._renderIcon()}
                </View>
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

            </View >
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

