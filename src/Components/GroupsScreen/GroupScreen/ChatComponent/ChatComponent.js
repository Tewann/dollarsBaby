//*
// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Group Option Component
// Called by group screen
// Displays group name, photo and messages to send (if user has created group)
//*


import React from 'react'
import { View, TouchableOpacity, Text, FlatList, TextInput, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MessageItem from './MessageItem/MessageItem'
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker'
import { strings } from '../../../../i18n'
import ConversationComponent from './ConversationComponent/ConversationComponent';
import { uploadImageForMessagesToFirebase } from '../../../../Services/firebaseFunctions'

var options = { quality: 0.1 };

class ChatComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            additionnalMessage: "",
            errorMessage: null,
            //groupType: null,
            // groupNameIndex: null,
            groupCreatorIsCurrentUser: false,
            displayConversation: false,
            displayAttachement: true,
            displayCameraLibraryButtons: false,
            imageUri: null
        }
    }

    componentWillMount = () => {
        /*         const groupNameIndex = this.props.groupList.findIndex(item =>
                    item.name === this.props.currentGroup)
                const groupType = this.props.groupList[this.props.].type */
        const groupCreatorIsCurrentUser = this.props.groupList[this.props.currentDisplayedGroupIndex].creator === this.props.currentUser.name
        this.setState({ /* groupType: groupType, groupNameIndex: groupNameIndex,  */groupCreatorIsCurrentUser: groupCreatorIsCurrentUser })
        if (this.props.currentDisplayedGroupType === 'private' || groupCreatorIsCurrentUser) {
            const hideAdsAction = { type: 'AD_BANNER', value: { value: false, event: 'screen' } }
            this.props.dispatch(hideAdsAction)
        }
    }

    componentWillUnmount = () => {
        const displaysAdsAction = { type: 'AD_BANNER', value: { value: true, event: null } }
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
        this.setState({ errorMessage: null, additionnalMessage: "", imageUri: null, displayAttachement: true, displayCameraLibraryButtons: false})
        this.messageInput.clear()
        // Calls firebase function
        // prepares payload
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUser.name
        const contact = this.props.currentGroup
        const additionnal_message = this.state.additionnalMessage
        const id = `${currentUser}_${timeStamp}`
        const type = 'send'
        const displayGroupName = this.props.groupList[this.props.currentDisplayedGroupIndex].displayName
        const groupType = this.props.currentDisplayedGroupType
        const imageUri = this.state.imageUri
        let imageDownloadUrl = null

        // update redux store
        const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type, senderType: groupType, imageUri } }
        this.props.dispatch(action)

        // If an image has been selected to be send, upload it to firebase, grabs download url and sends it to the contact
        if (imageUri != (null || undefined)) {
            const senderType = 'group'
            const downloadUrl = await uploadImageForMessagesToFirebase(currentUser, imageUri, senderType)
                .then()
                .catch(err => this.setState({ errorMessage: err }))
            imageDownloadUrl = { uri: downloadUrl }
        }

        // invok function
        const httpsCallable = firebase.functions().httpsCallable('messageSendToGroup')
        httpsCallable({
            groupType: groupType,
            displayName: displayGroupName,
            groupName: this.props.currentGroup,
            sendBy: this.props.currentUser.name,
            predefined_message: predefined_message,
            additionalMessage: this.state.additionnalMessage,
            imageDownloadUrl: imageDownloadUrl,
            timeStamp: timeStamp,
            id: id,
            sound: sound
        })
            .catch(httpsError => console.log('httpsCallable err' + httpsError))
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

    displayPredefinedMessageList = () => {
        if (this.props.currentDisplayedGroupType === 'private' || this.state.groupCreatorIsCurrentUser || this.props.groupList[this.props.currentDisplayedGroupIndex].chatActivated) {
            return (
                <View>
                    {/* ------ Error messages ------*/}
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', marginLeft: 7 }}>
                            {this.state.errorMessage}
                        </Text>}

                    {this._renderImageToSend()}

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
                        {this._renderAttachmentButtons()}
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
        currentDisplayedGroupScreen: state.groupManagment.currentDisplayedGroupScreen,
        currentDisplayedGroupType: state.groupManagment.currentDisplayedGroupType,
        currentDisplayedGroupIndex: state.groupManagment.currentDisplayedGroupIndex,
    }
}

export default connect(mapStateToProps)(ChatComponent)
