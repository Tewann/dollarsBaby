//*
// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Group Option Component
// Called by group screen
// Displays group name, photo and messages to send (if user has created group)
//*


import React from 'react'
import { View, TouchableOpacity, TextInput, Text, FlatList, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MessageItem from './MessageItem/MessageItem'
import GroupContactItem from './GroupContactItem/GroupContactItem'
import HeaderGroupContactList from './HeaderGroupContactList/HeaderGroupContactList'
import PublicGroupOptionsCreator from './PublicGroupOptionsCreatorComponent/PublicGroupOptionsCreator'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import ImagePicker from 'react-native-image-picker'
import { uploadGroupImage } from '../../../Services/firebaseGroupFunctions'

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

    //*
    // Switch GroupScreen screen 
    // Calls reducer / dispatch action
    //*
    displayGroup = () => {
        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'GroupList' }
        this.props.dispatch(action)
    }


    _addContactToGroup = (contactId, contactName) => {
        const contact_and_group = { contactId: contactId, contactName: contactName, groupId: groupId }
        const action = { type: 'ADD_CONTACT_TO_GROUP', value: contact_and_group }
        this.props.dispatch(action)
    }

    // Rendering group contact list header
    _renderHeader = () => {
        return <HeaderGroupContactList
            addContactToGroup={this._addContactToGroup} />
    }

    //*
    // Public group
    //*
    renderPublicGroup = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)

        if (this.props.groupList[groupNameIndex].creator === this.props.currentUser.name) {
            // Public group - Created by user
            // (if group creator matches current user name)
            // Displays predefined messages list
            // Allows user to change group image
            return (
                <PublicGroupOptionsCreator />
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
                    uploadGroupImage(requireSource, this.props.currentGroup)
                        .then((dlLink, PhotoName) => {
                            console.log('phtoo updated from app')
                            const groupName = this.props.currentGroup
                            const dlURL = dlLink.downloadURL
                            // update redux store, image is changed on profil screen component
                            const action = {
                                type: 'GROUP_PHOTO_UPDATED',
                                value: {groupName, dlURL, PhotoName}
                            }
                            this.props.dispatch(action)
                        })
                        .catch(error => this.setState({ errorMessage: error }))
                }
            });
        } else {
            this.setState({ errorMessage: "Vous n'êtes pas le créateur du groupe" })
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
            <Text style={styles.group_name_creator}>created by {groupNameCreator}</Text>
        )
    }

    // if private group
    renderContactList = () => {
        /*<View style={styles.contacts_flatlist}>
            <FlatList
                data={this.props.groupList[groupNameIndex].contacts}
                ListHeaderComponent={() => this._renderHeader()}
                keyboardShouldPersistTaps={'always'}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <GroupContactItem contact={item} />}
            />
        </View>*/
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                {/* ------  Header (back button) ------*/}
                <TouchableOpacity
                    style={styles.back_to_contacts}
                    onPressIn={() => this.displayGroup()}>
                    <Icon name='chevron-left' color='#889eb0' />
                    <Text style={styles.retour}>Retour</Text>
                </TouchableOpacity>

                {/* ------  Body ------*/}
                {/* ------  Group Image, name and creator name ------*/}
                <View style={styles.avatar_container}>
                    {this._renderImage()}
                    <Text style={styles.group_name}>{this.props.currentGroup}</Text>
                    {this._renderGroupNameCreator()}
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10, textAlign: 'center' }}>
                            Erreur : {this.state.errorMessage}
                        </Text>}
                </View>

                {/* ------  PublicGroup ------*/}
                {this.renderPublicGroup()}
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