//*
// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Group Option Component
// Called by group screen
// Displays group name, photo and messages to send (if user has created group)
//*


import React from 'react'
import { View, TouchableOpacity, ScrollView, Text, FlatList, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MessageItem from './MessageItem/MessageItem'
import GroupContactItem from './GroupContactItem/GroupContactItem'
import HeaderGroupContactList from './HeaderGroupContactList/HeaderGroupContactList'
import MessagesList from './MessagesListComponent/MessagesList'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import ImagePicker from 'react-native-image-picker'
import { uploadGroupImage, addContactToPrivateGroup, retrivingContacts } from '../../../Services/firebaseGroupFunctions'
import { strings } from '../../../i18n'

// variable to avoid "Can't find variable: options" when trying to open image picker or camera
var options = { quality: 0.1 };

class GroupOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png'),
            errorMessage: null,
        }
    }
    componentDidMount = async () => {
        // Each time a group is open, check data base and get contacts
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)

        const groupType = this.props.groupList[groupNameIndex].type

        if (groupType == 'private') {
            retrivingContacts(this.props.currentGroup)
        }
    }

    //*
    // Switch between GroupScreen screens and goes back to the group list
    // Calls reducer / dispatch action
    //*
    displayGroup = () => {
        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'GroupList' }
        this.props.dispatch(action)
    }

    //*
    // Add contact to private group
    //*
    _addContactToGroup = async (contactId, contactName) => {
        // Adding contact to firebase
        const addContactToGroup = await addContactToPrivateGroup(this.props.currentGroup, contactName)
            .catch(err => {
                this.setState({ errorMessage: err })
            })
    }


    //*
    // Public group creator or Private Group
    //*
    displayMessageList = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)

        const groupType = this.props.groupList[groupNameIndex].type

        if (this.props.groupList[groupNameIndex].creator === this.props.currentUser.name || this.props.groupList[groupNameIndex].type === 'private') {
            // Public group - Created by user (if group creator matches current user name)
            // Private Group
            // Displays predefined messages list
            return (
                <MessagesList type={groupType} />
            )
        }
    }


    _openImagePicker = async () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)

        if (this.props.groupList[groupNameIndex].creator === this.props.currentUser.name) {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    return
                }
                else if (response.error) {
                    this.setState({ errorMessage: response.error })
                }
                else {
                    let requireSource = { uri: response.uri }
                    const groupNameIndex = this.props.groupList.findIndex(item =>
                        item.name === this.props.currentGroup)
                    groupType = this.props.groupList[groupNameIndex].type
                    uploadGroupImage(requireSource, this.props.currentGroup, groupType)
                        .then((dlLink, PhotoName) => {
                            const groupName = this.props.currentGroup
                            const dlURL = dlLink.downloadURL
                            // update redux store, image is changed on profil screen component
                            const action = {
                                type: 'GROUP_PHOTO_UPDATED',
                                value: { groupName, dlURL, PhotoName }
                            }
                            this.props.dispatch(action)
                        })
                        .catch(error => this.setState({ errorMessage: error }))
                }
            });
        } else {
            this.setState({ errorMessage: strings('groups_screen.group_options.not_creator') })
            setTimeout(() => { this.setState({ errorMessage: null }) }, 2000)
        }
    }

    _renderImage = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        let uri = this.props.groupList[groupNameIndex].photoURL
        if (uri === null) {
            return (
                <TouchableOpacity
                    style={styles.rounds}
                    onPress={() => this._openImagePicker()}
                >
                    <Image
                        source={this.state.defaultPicture}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <ImageCacheProvider
                    ImageCacheManagerOptions={{ ttl: 100 }}
                >
                    <TouchableOpacity
                        style={styles.rounds}
                        onPress={() => this._openImagePicker()}
                    >
                        <CachedImage
                            source={{ uri: uri }}
                            style={styles.rounds}
                        />
                    </TouchableOpacity>
                </ImageCacheProvider>
            )
        }
    }

    _renderGroupNameCreator = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        const groupNameCreator = this.props.groupList[groupNameIndex].creator
        return (
            <Text style={styles.group_name_creator}>{strings('groups_screen.group_options.created_by')} {groupNameCreator}</Text>
        )
    }

    //*
    // Private Groups
    // Displays contact list
    // Header = Add contact buttons
    //*
    renderContactList = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        if (this.props.groupList[groupNameIndex].type === 'private') {
            return (
                <View elevation={1} style={styles.contacts_flatlist}>
                    <FlatList
                        data={this.props.groupList[groupNameIndex].contacts}
                        ListHeaderComponent={() => this._renderHeader()}
                        keyboardShouldPersistTaps={'always'}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <GroupContactItem contact={item} />}
                    />
                </View>
            )
        }
    }

    //*
    // Private Groups
    // Header for contact list
    // Button : Add contact
    //*
    _renderHeader = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        if (this.props.groupList[groupNameIndex].creator === this.props.currentUser.name) {
            return <HeaderGroupContactList
                addContactToGroup={this._addContactToGroup} />
        } else {
            return <View></View>
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {/* ------  Header (back button) ------*/}
                <TouchableOpacity
                    style={styles.back_to_contacts}
                    onPressIn={() => this.displayGroup()}>
                    <Icon name='chevron-left' color='#889eb0' />
                    <Text style={styles.retour}>{strings('groups_screen.group_options.back')}</Text>
                </TouchableOpacity>
                <ScrollView >
                    {/* ------  Body ------*/}
                    {/* ------  Group Image, name and creator name ------*/}
                    <View style={styles.avatar_container}>
                        {this._renderImage()}
                        <Text style={styles.group_name}>{this.props.currentGroup}</Text>
                        {this._renderGroupNameCreator()}
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10, textAlign: 'center' }}>
                                {strings('groups_screen.group_options.error_title')} : {this.state.errorMessage}
                            </Text>}
                    </View>
                    {/* ------  Private groups - Contact list ------*/}
                    {this.renderContactList()}
                    {/* ------  Displays message list for creators and private groups ------*/}
                    {this.displayMessageList()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        groupList: state.groupManagment.groupList,
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(GroupOptions)
