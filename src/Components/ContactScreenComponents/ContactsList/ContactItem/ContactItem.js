// src/Components/ContactScreenComponents/ContactScreenComponents/ContactItem/ContactItem.js
// Component: display each iteration of contact list

import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
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
    * Grabs group name, calls reducer to change state and to display the contact screen
    */

    _displayContactScreen = (contact) => {
        const action = { type: 'SWITCH_CONTACT_SCREEN', value: contact }
        this.props.dispatch(action)
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

    render() {
        const { contact } = this.props
        return (
            <TouchableOpacity
                onPress={() => this._displayContactScreen(contact.name)}
                style={styles.main_container}>
                {this._renderImage()}
                <Text style={styles.contact_text}>
                    {this.state.displayName}
                </Text>

            </TouchableOpacity >

        )
    }
}

export default connect()(withNavigation(ContactItem))