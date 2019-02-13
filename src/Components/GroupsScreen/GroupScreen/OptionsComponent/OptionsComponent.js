/**
* Called from Group Screen
* Displays the options component :
*  - change group image
* Props : 
*  - 
*/

import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../../i18n'

import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import GroupContactItem from './GroupContactItem/GroupContactItem'
import HeaderGroupContactList from './HeaderGroupContactList/HeaderGroupContactList'

import { Icon } from 'react-native-elements'
import { uploadGroupImage, addContactToPrivateGroup, leaveGroup } from '../../../../Services/firebaseGroupFunctions'

const options = { quality: 0.1 };

class MessagesListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            loading: false,
            imageUploaded: false,
            groupType: null,
            groupNameIndex: null,
            groupCreatorIsCurrentUser: false,
            deleteIcon: true,
            deleteSuccessful: false,
            leaveGroupConfirmation: false,
            leaveGroupIcon: true,
            leaveGroupLoading: false,
        }
    }

    componentWillMount = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        const groupType = this.props.groupList[groupNameIndex].type
        const groupCreatorIsCurrentUser = this.props.groupList[groupNameIndex].creator === this.props.currentUser
        this.setState({ groupType: groupType, groupNameIndex: groupNameIndex, groupCreatorIsCurrentUser: groupCreatorIsCurrentUser })
    }

    _openImageLibrary = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            this._uploadImageToDb(response)
        });
    }

    _openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            this._uploadImageToDb(response)
        });
    }

    _uploadImageToDb = (response) => {
        if (response.didCancel) {
            return
        }
        else if (response.error) {
            this.setState({ errorMessage: response.error })
        }
        else {
            this.setState({ loading: true })
            let requireSource = { uri: response.uri }
            uploadGroupImage(requireSource, this.props.currentGroup, this.state.groupType)
                .then((dlLink, PhotoName) => {
                    this.setState({ loading: false, imageUploaded: true })
                    setTimeout(() => {
                        this.setState({ imageUploaded: false })
                    }, 2000)
                })
                .catch(error => this.setState({ errorMessage: error, loading: false }))
        }
    }

    _renderIcon = () => {
        if (this.state.loading) {
            return (
                <ActivityIndicator size='large' />
            )
        } else if (this.state.imageUploaded) {
            return (
                <Icon
                    name='check'
                    type='feather'
                    size={30}
                    color='green'
                />
            )
        }
    }

    _modifyGroupPicture = () => {
        return (
            <View style={styles.profil_item}>
                <Text style={styles.title}>{strings('groups_screen.group_options.change_group_image')}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5 }}>
                    <TouchableOpacity
                        onPress={() => this._openImageLibrary()}
                    >
                        <Ionicons
                            name='ios-images'
                            size={45}
                        />
                        <Text>{strings('profil_screen.change_profil_image.library')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._openCamera()}
                    >
                        <Ionicons
                            name='ios-camera'
                            size={45}
                        />
                        <Text>{strings('profil_screen.change_profil_image.photo')}</Text>
                    </TouchableOpacity>
                </View>
                {this._renderIcon()}
            </View>
        )
    }

    _addContactToPrivateGroup = async (contactName) => {
        await addContactToPrivateGroup(this.props.currentGroup, contactName)
            .catch(err => {
                this.setState({ errorMessage: err })
            })

    }

    /**
    * Private Groups
    * Header for contact list
    * Button : Add contact
    */
    _renderHeaderForFlatList = () => {
        if (this.state.groupCreatorIsCurrentUser) {
            return (
                <HeaderGroupContactList
                    addContactToGroup={this._addContactToPrivateGroup} />
            )
        } else {
            return null
        }
    }

    renderContactList = () => {
        if (this.state.groupType === 'private' ) {
            return (
                <View style={styles.profil_item}>
                    <Text style={styles.title}>{strings('groups_screen.group_options.members_of_group')}</Text>
                    <FlatList
                        data={this.props.groupList[this.state.groupNameIndex].contacts}
                        ListHeaderComponent={() => this._renderHeaderForFlatList()}
                        keyboardShouldPersistTaps={'handled'}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <GroupContactItem contact={item} group={this.props.currentGroup} type={this.state.groupType} />}
                    />
                </View>
            )
        }
    }

    deleteHistory = async () => {
        this.setState({ deleteIcon: false, deleteSuccessful: true })
        const action = { type: 'DELETE_MESSAGE_HISTORY', value: this.props.currentGroup }
        this.props.dispatch(action)
        setTimeout(() => {
            this.setState({ deleteSuccessful: false, deleteIcon: true })
        }, 1000)

    }

    renderDeleteHistory = () => {
        return (
            <View style={styles.profil_item}>
                <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_history')}</Text>
                {this.state.deleteSuccessful &&
                    <Icon
                        name='check'
                        type='feather'
                        size={30}
                        color='green'
                    />
                }
                {this.state.deleteIcon &&
                    <Icon
                        name='trash'
                        type='evilicon'
                        color='#517fa4'
                        size={50}
                        onPress={() => this.deleteHistory()}
                    />
                }
            </View>
        )
    }

    renderLeaveGroup = () => {
        return (
            <View style={styles.profil_item}>
                {this.state.leaveGroupLoading && <ActivityIndicator />}
                {this.state.leaveGroupConfirmation &&
                    <View>
                        <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.leave_group_confirmation')}</Text>
                        <Icon
                            name='exit-to-app'
                            type='materialcommunity'
                            color='#517fa4'
                            size={35}
                            onPress={() => {
                                this.setState({ leaveGroupConfirmation: false, leaveGroupLoading: true })
                                leaveGroup(this.props.currentUser, this.props.currentGroup, this.state.groupType)
                            }}
                        />
                    </View>
                }
                {this.state.leaveGroupIcon &&
                    <View>
                        <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.leave_group')}</Text>
                        <Icon
                            name='exit-to-app'
                            type='materialcommunity'
                            color='#517fa4'
                            size={35}
                            onPress={() => this.setState({ leaveGroupIcon: false, leaveGroupConfirmation: true })}
                        />
                    </View>
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.profil_item_containers}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center' }}>
                        {strings('profil_screen.change_profil_image.error')} : {this.state.errorMessage}
                    </Text>}
                {this.state.groupCreatorIsCurrentUser && this._modifyGroupPicture()}
                {this.renderContactList()}
                {this.renderDeleteHistory()}
                {this.renderLeaveGroup()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
        currentUser: state.getCurrentUserInformations.name,
    }
}

export default connect(mapStateToProps)(MessagesListScreen)

