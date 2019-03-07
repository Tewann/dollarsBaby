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
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import styles from './styles'

import MessageItem from './MessageItem/MessageItem'
import ConversationComponent from './ConversationComponent/ConversationComponent'

import { connect } from 'react-redux'
import { sendMessageToFirestore, uploadImageForMessagesToFirebase } from '../../../../Services/firebaseFunctions'
import { strings } from '../../../../i18n'
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import { isIphoneX } from '../../../../Services/is-iphone-x'

var options = { quality: 0.1 };
const KEYBOARDVERTICALOFFSET = isIphoneX() ? 96 : 64

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
            imageUri: null,
            displayPredefinedMessagesList: true,
            displayMessagesComplement: false,
            complementsAndInitialMessage: [],
            displayMessagesComplementLoading: false
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
    _sendMessage = async (predefined_message, sound, additionnalMessage) => {
        // reset error message
        this.setState({ errorMessage: null })
        // calls firebase function
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUser.name
        const contact = this.props.contact
        const additionnal_message = additionnalMessage ? additionnalMessage : this.state.additionnalMessage
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
                this._sendMessage(predefined_message = null, sound = 's1blink')
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
                this._sendMessage(predefined_message = null, sound = 's1blink')
            }
        });
    }

/*     _renderImageToSend = () => {
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
    } */

    _displayMessagesComplement = (complementsAndInitialMessage) => {
        if (complementsAndInitialMessage.complements) {
            this.setState({
                displayPredefinedMessagesList: false,
                displayMessagesComplement: true,
                complementsAndInitialMessage: complementsAndInitialMessage,
            })
        }
    }

    sendMessageWithComplements = (complement) => {
        // If user wants to send location, calls api 'Opencagedata' and convert lat/long to formatted adress, then send message
        if (complement === strings('reducers.position')) {
            this.setState({ displayMessagesComplementLoading: true, displayMessagesComplement: false })
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://api.opencagedata.com/geocode/v1/geojson?q=${position.coords.latitude}+${position.coords.longitude}&key=a7ef5976448c4efd9b2cf2dbc104846e&pretty=1`)
                    .then((response) => {
                        response.json()
                            .then(responseJson => {
                                const formattedLocation = responseJson.features[0].properties.formatted
                                const location = strings('contacts_screen.messages_list_screen.my_position') + formattedLocation
                                this._sendMessage(this.state.complementsAndInitialMessage.title, this.state.complementsAndInitialMessage.sound, location)
                                this.setState({
                                    displayPredefinedMessagesList: true,
                                    displayMessagesComplement: false,
                                    complementsAndInitialMessage: [],
                                    displayMessagesComplementLoading: false
                                })
                            })
                    })
                    .catch(err => this.setState({ errorMessage: err }))
            })
        } else {
            this._sendMessage(this.state.complementsAndInitialMessage.title, this.state.complementsAndInitialMessage.sound, complement)
            this.setState({
                displayPredefinedMessagesList: true,
                displayMessagesComplement: false,
                complementsAndInitialMessage: [],
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={KEYBOARDVERTICALOFFSET}
                style={{ flex: 1 }}>
                {this._displayConversation()}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', marginLeft: 7 }}>
                        {this.state.errorMessage}
                    </Text>}
               {/*  {this._renderImageToSend()} */}
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
                <SafeAreaView>
                    <View style={{ paddingBottom: 5 }}>
                        {this.state.displayPredefinedMessagesList &&
                            <FlatList
                                data={this.props.predefinedMessagesList}
                                numColumns={3}
                                columnWrapperStyle={styles.flatlist}
                                keyboardShouldPersistTaps={'handled'}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <MessageItem message={item}
                                    sendMessage={(predefined_message, sound) => this._sendMessage(predefined_message, sound)}
                                    displayComplementsOnLongPress={(complementsAndInitialMessage) => this._displayMessagesComplement(complementsAndInitialMessage)}
                                />}
                            />
                        }
                        {
                            this.state.displayMessagesComplement && (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            displayPredefinedMessagesList: true,
                                            displayMessagesComplement: false,
                                            complementsAndInitialMessage: []
                                        })}
                                        style={styles.complements_title}>
                                        <Text style={[styles.text, { color: 'black' }]}>{this.state.complementsAndInitialMessage.title}</Text>
                                    </TouchableOpacity>
                                    <FlatList
                                        data={this.state.complementsAndInitialMessage.complements}
                                        numColumns={3}
                                        columnWrapperStyle={styles.flatlist}
                                        keyboardShouldPersistTaps={'handled'}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity
                                                onPress={() => this.sendMessageWithComplements(item.name)}
                                                style={styles.main_container_for_complements}>
                                                <Text style={styles.text}>{item.name}</Text>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            )
                        }
                        {
                            this.state.displayMessagesComplementLoading && (
                                <View style={styles.complements_title}>
                                    <ActivityIndicator
                                        style={{ flex: 1 }}
                                        size='large' />
                                </View>
                            )
                        }
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView >
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

