// Component: display each iteration of group list
// displays group name, photo group and public or private

import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../../i18n'

import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'

import { withNavigation } from 'react-navigation'

class GroupItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png')
        }
    }

    /**
    * Grabs gorup name, calls reducer to change state and navigate to the contact screen
    */
    displayGroupScreen = (groupName) => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.group.name && item.type === this.props.group.type)
        const action = { type: 'SWITCH_GROUP_SCREEN', value: {
            groupName: this.props.group.name, 
            groupType: this.props.group.type,
            groupNameIndex: groupNameIndex,
            displayedGroupName: this.props.group.displayName
        }}
        this.props.dispatch(action)
        const actionToConversation = { type: 'SWITCH_GROUP_SCREEN_OPTIONS', value: 'conversation' }
        this.props.dispatch(actionToConversation)
        this.props.navigation.navigate('GroupScreen')
    }

    displayGroupOptionsScreen= (groupName) => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.group.name && item.type === this.props.group.type)
        const action = { type: 'SWITCH_GROUP_SCREEN', value: {
            groupName: this.props.group.name, 
            groupType: this.props.group.type,
            groupNameIndex: groupNameIndex,
            displayedGroupName: this.props.group.displayName
        }}
        this.props.dispatch(action)
        const actionToOptions = { type: 'SWITCH_GROUP_SCREEN_OPTIONS', value: 'options' }
        this.props.dispatch(actionToOptions)
        this.props.navigation.navigate('GroupScreen')
    }

    _renderImage = () => {
        let uri = this.props.group.photoURL
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

    _renderUnreadCount = () => {
        if (this.props.group.unreadMessages !== undefined ) {
            const unreadCount = this.props.group.unreadMessages.length < 100 ? this.props.group.unreadMessages.length : '99+'
            return (
                <View style={styles.unread_messages_container}>
                    <Text style={styles.unread_messages_number}>{unreadCount}</Text>
                </View>
            )
        }
    }

    render() {
        const group = this.props.group
        return (
            <TouchableOpacity
                onPress={() => this.displayGroupScreen(group.name)}
                onLongPress={() => this.displayGroupOptionsScreen(group.name)}
                style={styles.main_container}>
                {this._renderImage()}
                {this._renderUnreadCount()}
                <View style={styles.text_container}>
                    <Text style={styles.contact_text}>
                        {group.displayName}
                    </Text>
                    <Text style={styles.type_text}>
                        ({group.type === 'public' ?
                            strings('groups_screen.group_list.group_item.public') :
                            strings('groups_screen.group_list.group_item.private')
                        })
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
    }
}

export default connect(mapStateToProps)(withNavigation(GroupItem))