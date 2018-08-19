// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Component Group Options on Group Screen

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


class GroupOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png')
        }
    }
    // grabs group name, then call redux function
    // modify redux store
    displayGroup = () => {
        const action = { type: 'SWITCH_GROUP_SCREEN', value: 'GroupList' }
        this.props.dispatch(action)
    }

    // Updating redux state in order to send addionnal text with predefined messages
    _messageToSendChanged(text) {
        const action = { type: 'MESSAGE_TO_SEND', value: text }
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

    // when group is public and user has created group
    // displays predefined message list and change group image
    renderPublicGroupCreator = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        if (this.props.groupList[groupNameIndex].status === 'created') {
            return (
                <PublicGroupOptionsCreator />
            )
        }
    }

    _renderImage = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.currentGroup)
        let uri = this.props.groupList[groupNameIndex].photoURL
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
                <TouchableOpacity
                    style={styles.back_to_contacts}
                    onPressIn={() => this.displayGroup()}>
                    <Icon name='chevron-left' color='#889eb0' />
                    <Text style={styles.retour}>Retour</Text>
                </TouchableOpacity>
                <View style={styles.avatar_container}>
                    {this._renderImage()}
                    <Text style={styles.group_name}>{this.props.currentGroup}</Text>
                </View>


                {this.renderPublicGroupCreator()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        groupList: state.groupManagment.groupList,
        currentGroup: state.groupManagment.currentDisplayedGroup[0]
    }
}

export default connect(mapStateToProps)(GroupOptions)