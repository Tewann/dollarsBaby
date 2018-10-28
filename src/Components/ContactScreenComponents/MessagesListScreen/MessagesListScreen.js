//src/Components/ContactScreenComponents/MessagesListScreen/MessagesListScreen.js
//Component: message list screen

import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import MessageItem from '../MessageItem/MessageItem'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { sendMessageToFirestore } from '../../../Services/firebaseFunctions'
import { strings } from '../../../i18n'


class MessagesListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png'),
            additionnalMessage: "",
            errorMessage: null
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
    _sendMessage = async (predefined_message, sound) => {
        if (this.state.additionnalMessage.length <= 100) {
            // if additional message length doesn't exceed 100
            // reset error message
            this.setState({ errorMessage: null })
            console.log('contact')
            console.log(this.props.contact)
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
                    setTimeout(() => this.props.returnToContactScreen(), 500)
                })
                .catch(err => this.setState({ errorMessage: err }))

        } else {
            // if additionnal message length exceed 100
            this.setState({ errorMessage: strings('contacts_screen.messages_list_screen.close_button') })
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

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact)
        let uri = this.props.contactList[contactNameIndex].photoUrl
        const backUpUri = '../../../../images/ic_tag_faces.png'
        if (uri === null) {
            return (
                <Image
                    source={this.state.defaultPicture}
                    style={styles.rounds}
                />
            )
        } else {
            return (
                <ImageCacheProvider
                    ImageCacheManagerOptions={{ ttl: 100 }}>
                    <CachedImage
                        source={{ uri: uri }}
                        style={styles.rounds}
                    />
                </ImageCacheProvider>
            )
        }
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                <TouchableOpacity
                    style={styles.back_to_contacts}
                    onPressIn={() => this.props.returnToContactScreen()}>
                    <Icon name='chevron-left' color='#889eb0' />
                    <Text style={styles.retour}>{strings('contacts_screen.messages_list_screen.back')}</Text>
                </TouchableOpacity>
                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={120}
                        enabled
                    >
                        <View style={styles.avatar_container}>
                            {this._renderImage()}
                            <Text style={styles.username}>{this.props.contact}</Text>
                        </View>
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red', marginLeft: 7 }}>
                                {this.state.errorMessage}
                            </Text>}
                        <View style={styles.TextInput_container}>
                            {this._displayAdditionnalMessageLenght()}
                            <TextInput
                                placeholder={strings('contacts_screen.messages_list_screen.placeholder')}
                                onChangeText={(text) => this._additionnalMessageChanged(text)}
                                //onSubmitEditing={() => {}}
                                style={styles.text_input}
                                underlineColorAndroid={'white'}
                                autoCorrect={false}
                                ref={component => this.messageInput = component}
                            />
                        </View>
                        <FlatList
                            data={this.props.predefinedMessagesList}
                            numColumns={2}
                            columnWrapperStyle={styles.flatlist}
                            keyboardShouldPersistTaps={'always'}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MessageItem message={item}
                                sendMessage={(predefined_message, sound) => this._sendMessage(predefined_message, sound)}
                                contact={this.props.contact}
                            />}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        contactList: state.contactManagment.contactList,
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(MessagesListScreen)

