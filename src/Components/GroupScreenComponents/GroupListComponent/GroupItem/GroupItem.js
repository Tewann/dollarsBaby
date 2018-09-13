// src/Components/GroupScreenComponents/GroupItem/GroupItem.js
// Component: display each iteration of group list
// displays group name, photo group and public or private

import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { strings } from '../../../../i18n'

class GroupItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png')
        }
    }

    // grabs group name, then call redux function
    // modify redux store
    displayGroup = (groupName) => {
        const action = { type: 'SWITCH_GROUP_SCREEN', value: groupName}
        this.props.dispatch(action)
    }

    _renderImage = () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            item.name === this.props.group.name)
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
                ImageCacheManagerOptions={{ttl: 100}}>
                    <CachedImage
                        source={{ uri: uri }}
                        style={styles.rounds}
                    />
                </ImageCacheProvider>
            )
        }
    }

    render() {
        const group = this.props.group
        return (
            <TouchableOpacity
                onPress={() => this.displayGroup(group.name)}
                style={styles.main_container}>
                {this._renderImage()}
                <View style={styles.text_container}>
                    <Text style={styles.contact_text}>
                        {group.name}
                    </Text>
                    <Text style={styles.type_text}>
                        ({group.type === 'public' ? 
                            strings(groups_screen.group_list.group_item.public) :
                            strings(groups_screen.group_list.group_item.private)
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
        currentGroup: state.groupManagment.currentDisplayedGroup[0]
    }
}

export default connect(mapStateToProps)(GroupItem)