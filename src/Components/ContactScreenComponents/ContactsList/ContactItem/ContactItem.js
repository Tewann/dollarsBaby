// Component: display each iteration of contact list

import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'

import { withNavigation } from 'react-navigation'


class ContactItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png'),
            displayName: this.props.contact.name
        }
    }

    componentWillMount = () => {
        if (this.props.contact.nickname != undefined || null) {
            this.setState({ displayName: this.props.contact.nickname })
        }
    }

    /**
    * Grabs contact name, calls reducer to change state and navigate to the contact screen
    */

    _displayContactScreen = (contact) => {
        const action = { type: 'SWITCH_CONTACT_SCREEN', value: contact }
        this.props.dispatch(action)
        const actionToOptions = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'conversation' }
        this.props.dispatch(actionToOptions)
        this.props.navigation.navigate('ContactScreen')
    }

    _displayContactOptions = (contact) => {
        const action = { type: 'SWITCH_CONTACT_SCREEN', value: contact }
        this.props.dispatch(action)
        const actionToOptions = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'options' }
        this.props.dispatch(actionToOptions)
        this.props.navigation.navigate('ContactScreen')
    }

    _renderImage = () => {
        let uri = this.props.contact.photoUrl
        if (uri === null || uri === undefined) {
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
        if (this.props.contact.unreadMessages !== undefined ) {
            const unreadCount = this.props.contact.unreadMessages.length < 100 ? this.props.contact.unreadMessages.length : '99+'
            return (
                <View style={styles.unread_messages_container}>
                    <Text style={styles.unread_messages_number}>{unreadCount}</Text>
                </View>
            )
        }
    }

    render() {
        const { contact } = this.props
        return (
            <TouchableOpacity
                onPress={() => this._displayContactScreen(contact.name)}
                onLongPress={() => this._displayContactOptions(contact.name)}
                style={styles.main_container}>
                {this._renderImage()}
                {this._renderUnreadCount()}
                <Text style={styles.contact_text}>
                    {this.state.displayName}
                </Text>
            </TouchableOpacity>

        )
    }
}

export default connect()(withNavigation(ContactItem))