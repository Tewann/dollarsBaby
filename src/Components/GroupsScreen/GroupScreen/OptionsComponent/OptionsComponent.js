/**
* Called from Group Screen
* Displays the options component :
*  - change group image
* Props : 
*  - 
*/

import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, Switch } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../../i18n'

import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import GroupContactItem from './GroupContactItem/GroupContactItem'
import HeaderGroupContactList from './HeaderGroupContactList/HeaderGroupContactList'

import { Icon } from 'react-native-elements'
import { uploadGroupImage, addContactToPrivateGroup, leaveGroup, activateChatForPublicGroups, deleteGroup } from '../../../../Services/firebaseGroupFunctions'

const options = { quality: 0.1 };

class MessagesListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            loading: false,
            imageUploaded: false,
            //groupType: null,
            //groupNameIndex: null,
            groupCreatorIsCurrentUser: false,
            deleteIcon: true,
            deleteSuccessful: false,
            leaveGroupConfirmation: false,
            leaveGroupIcon: true,
            leaveGroupLoading: false,
            deleteGroupConfirmation: false,
            deleteGroupIcon: true,
            deleteGroupLoading: false,
        }
    }

    componentWillMount = () => {
/*         const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup && item.type === this.props.currentDisplayedGroupType)
 */        const groupCreatorIsCurrentUser = this.props.groupList[this.props.currentDisplayedGroupIndex].creator === this.props.currentUser
        this.setState({ /* groupType: this.props.currentDisplayedGroupType, groupNameIndex: groupNameIndex, */ groupCreatorIsCurrentUser: groupCreatorIsCurrentUser })
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
            console.log(this.props.currentDisplayedGroupType)
            uploadGroupImage(requireSource, this.props.currentGroup, this.props.currentDisplayedGroupType)
                .then((dlLink, PhotoName) => {
                    console.log('image uploaded')
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
        if (this.props.currentDisplayedGroupType === 'private') {
            return (
                <View style={styles.profil_item}>
                    <Text style={styles.title}>{strings('groups_screen.group_options.members_of_group')}</Text>
                    <FlatList
                        data={this.props.groupList[this.props.currentDisplayedGroupIndex].contacts}
                        ListHeaderComponent={() => this._renderHeaderForFlatList()}
                        keyboardShouldPersistTaps={'handled'}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <GroupContactItem contact={item} group={this.props.currentGroup} type={this.props.currentDisplayedGroupType} />}
                    />
                </View>
            )
        }
    }

    toggleSwitch = (value) => {
        const action = { type: 'CHAT_ACTIVATED_CHANGED', value: { groupName: this.props.currentGroup, chatActivated: value } }
        this.props.dispatch(action)
        activateChatForPublicGroups(this.props.currentGroup, value)
            .catch(() => {
                const errValueToAction = value ? false : true
                const action = { type: 'CHAT_ACTIVATED_CHANGED', value: { groupName: this.props.currentGroup, chatActivated: errValueToAction } }
                this.props.dispatch(action)
            })
    }

    renderSwitchForChat = () => {
        return (
            <View style={[styles.profil_item, { alignItems: 'center' }]}>
                <Text style={styles.title}>{strings('groups_screen.group_options.activate_chat')}</Text>
                <Switch
                    style={{ marginTop: 10 }}
                    onValueChange={(value) => this.toggleSwitch(value)}
                    value={this.props.groupList[this.props.currentDisplayedGroupIndex].chatActivated}
                />
            </View>
        )
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
                                leaveGroup(this.props.currentUser, this.props.currentGroup, this.props.currentDisplayedGroupType)
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

    renderDeleteGroup = () => {
        if (this.state.groupCreatorIsCurrentUser) {
            return (
                <View style={styles.profil_item}>
                    {this.state.deleteGroupLoading && <ActivityIndicator />}
                    {this.state.deleteGroupConfirmation &&
                        <View>
                            <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_group_confirmation')}</Text>
                            <Icon
                                name='delete-forever'
                                type='materialcommunity'
                                color='#517fa4'
                                size={35}
                                onPress={() => {
                                    this.setState({ deleteGroupConfirmation: false, deleteGroupLoading: true })
                                    deleteGroup(this.props.currentUser, this.props.currentGroup, this.props.currentDisplayedGroupType)
                                        .catch(err => {
                                            this.setState({ errorMessage: err, deleteGroupLoading: false, deleteGroupIcon: true })
                                        })
                                }}
                            />
                        </View>
                    }
                    {this.state.deleteGroupIcon &&
                        <View>
                            <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_group')}</Text>
                            <Icon
                                name='delete-forever'
                                type='materialcommunity'
                                color='#517fa4'
                                size={35}
                                onPress={() => this.setState({ deleteGroupIcon: false, deleteGroupConfirmation: true })}
                            />
                        </View>
                    }
                </View>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <ScrollView style={styles.profil_item_containers}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center' }}>
                        {strings('profil_screen.change_profil_image.error')} : {this.state.errorMessage}
                    </Text>}
                {this.state.groupCreatorIsCurrentUser && this._modifyGroupPicture()}
                {(this.state.groupCreatorIsCurrentUser && this.props.currentDisplayedGroupType === 'public')
                    && this.renderSwitchForChat()}
                {this.renderContactList()}
                {this.renderDeleteHistory()}
                {this.renderLeaveGroup()}
                {this.renderDeleteGroup()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
        currentDisplayedGroupType: state.groupManagment.currentDisplayedGroupType,
        currentDisplayedGroupIndex: state.groupManagment.currentDisplayedGroupIndex,
        currentUser: state.getCurrentUserInformations.name,
    }
}

export default connect(mapStateToProps)(MessagesListScreen)

