// src/Components/GroupScreenComponents/GroupScreenComponent/GroupContactItem.js
// Component: display each iteration of contact list in group list

import React from 'react'
import { Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { Tooltip, Icon } from 'react-native-elements'
import { leaveGroup, retrivingContacts } from '../../../../../Services/firebaseGroupFunctions'
import NavigationService from '../../../../../Services/navigator'
import { strings } from '../../../../../i18n'



class GroupContactItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../../images/ic_tag_faces.png'),
            tooltip: true,
            tooltipLoading: false,
            tooltipOk: false,
            contactDeleted: false
        }
    }

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact.name)

        let uri = this.props.contactList[contactNameIndex] ? this.props.contactList[contactNameIndex].photoUrl : null
        if (this.state.contactDeleted) {
            return (
                <Icon
                    name='account-remove'
                    type='material-community'
                    size={30}
                    color='lightgrey'
                />
            )
        } else if (uri === null || uri === undefined) {
            return (
                <Tooltip popover={this._renderTooltipButton()}>
                    <Image
                        source={this.state.defaultPicture}
                        style={styles.rounds}
                    />
                </Tooltip>
            )
        } else {
            return (
                <Tooltip
                    popover={this._renderTooltipButton()}
                    backgroundColor='rgba(179, 255, 179, 0.7)'
                >
                    <ImageCacheProvider
                        ImageCacheManagerOptions={{ ttl: 100 }}>
                        <CachedImage
                            source={{ uri: uri }}
                            style={styles.rounds}
                        />
                    </ImageCacheProvider>
                </Tooltip>
            )
        }
    }

    _renderTooltipButton = () => {
        return (
            <TouchableOpacity onPress={async () => {
                this.setState({ tooltip: false, tooltipLoading: true })
                await leaveGroup(this.props.contact.name, this.props.group, this.props.type)
                    .then(async () => {
                        this.setState({ tooltipLoading: false, tooltipOk: true })
                        retrivingContacts(this.props.group)
                    })
                    .catch()
                this.setState({ contactDeleted: true })
            }}>
                {this.state.tooltip && <Text style={{ fontWeight: 'bold' }}>{strings('groups_screen.group_options.remove_member')}</Text>}
                {this.state.tooltipLoading && <ActivityIndicator />}
                {this.state.tooltipOk &&
                    <Icon
                        name='check'
                        type='feather'
                        size={30}
                        color='green'
                    />}
            </TouchableOpacity>
        )
    }

    render() {
        const contact = this.props.contact
        return (
            <View
                style={styles.main_container}
            >
                {this._renderImage()}
                <Text style={styles.contact_text}>
                    {contact.name}
                </Text>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(GroupContactItem)