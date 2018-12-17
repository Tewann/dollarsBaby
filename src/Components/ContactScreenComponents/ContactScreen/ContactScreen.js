/**
 * Contact Screen component
 * Display the contact information, last messages and the ability to send messages
 */

import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import MessageItem from './MessageItem/MessageItem'
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

    _displayContactsList = () => {
        const action = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList'}
        this.props.dispatch(action)
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
                setTimeout(() => this._displayContactsList(), 500)
            })
            .catch(err => this.setState({ errorMessage: err }))
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
                    onPressIn={() => this._displayContactsList()}>
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
                            <TextInput
                                placeholder={strings('contacts_screen.messages_list_screen.placeholder')}
                                onChangeText={(text) => this._additionnalMessageChanged(text)}
                                //onSubmitEditing={() => {}}
                                style={styles.text_input}
                                underlineColorAndroid={'white'}
                                autoCorrect={true}
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
        contact: state.contactManagment.currentDisplayedContact[0]
    }
}

export default connect(mapStateToProps)(MessagesListScreen)

