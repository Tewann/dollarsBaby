/**
 * Called from Navigation
 * Displays the Header For Group Screen :
 *  - back button to return to the contact screen
 *  - group photo
 *  - group name
 *  - group type?
 */

import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { strings } from '../../../../i18n'


class HeaderForGroupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png'),
            additionnalMessage: "",
            errorMessage: null,
            displayName: this.props.group
        }
    }

    componentWillMount = () => {
        const nickname = this.props.groupList[this.props.currentDisplayedGroupIndex].displayName
        if (nickname != undefined || null) {
            this.setState({ displayName: nickname })
        }
    }

    _navigateToOptions = () => {
        if (this.props.currentDisplayedGroupScreen === 'conversation') {
            const action = { type: 'SWITCH_GROUP_SCREEN_OPTIONS', value: 'options' }
            this.props.dispatch(action)
        } else {
            const action = { type: 'SWITCH_GROUP_SCREEN_OPTIONS', value: 'conversation' }
            this.props.dispatch(action)
        }
    }

    _renderImage = () => {
        let uri = this.props.groupList[this.props.currentDisplayedGroupIndex].photoURL
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

    _renderGroupNameCreator = () => {
        const groupNameCreator = this.props.groupList[this.props.currentDisplayedGroupIndex].creator
        return (
            <Text style={styles.group_name_creator}>{strings('groups_screen.group_options.created_by')} {groupNameCreator}</Text>
        )
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.picture_and_name_container}
                onPress={() => this._navigateToOptions()}
            >
                {this._renderImage()}
                <View>
                    <Text style={styles.username}>{this.state.displayName}</Text>
                    {this._renderGroupNameCreator()}
                </View>
            </TouchableOpacity>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
        group: state.groupManagment.currentDisplayedGroup[0],
        currentDisplayedGroupScreen: state.groupManagment.currentDisplayedGroupScreen[0],
        currentDisplayedGroupIndex: state.groupManagment.currentDisplayedGroupIndex,
    }
}

export default connect(mapStateToProps)(HeaderForGroupScreen)

