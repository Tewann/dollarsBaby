/**
 * Called from Navigation
 * Displays the Header Component :
 *  - back button to return to the contact screen
 *  - contact photo
 *  - contact name
 * Starts backhandler listener for android
 * Props : 
 *  - displayContactsList : _displayContactsList() => function to navigate back to the contact screen
 */

import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'


class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png'),
            additionnalMessage: "",
            errorMessage: null,
            displayName: this.props.contact
        }
    }

    componentWillMount = () => {
        const contactIndex = this.props.contactList.findIndex(item => item.name === this.props.contact)
        const nickname = this.props.contactList[contactIndex].nickname
        if (nickname != undefined || null) {
            this.setState({ displayName: nickname })
        }
    }

    _navigateToOptions = () => {
        // If the screen is showing the option menu, pressing the arrow icon on the header will 
        // go back to the screen of the contact (with the conversation)
        if (this.props.currentDisplayedContactScreen == 'conversation') {
            const action = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'options' }
            this.props.dispatch(action)
        } else {
            const action = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'conversation' }
            this.props.dispatch(action)
        }
    }

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact)
        let uri = this.props.contactList[contactNameIndex].photoUrl
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

    render() {
        return (
            <TouchableOpacity
                style={styles.picture_and_name_container}
                onPress={() => this._navigateToOptions()}
            >
                {this._renderImage()}
                <Text style={styles.username}>{this.state.displayName}</Text>
            </TouchableOpacity>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        contact: state.contactManagment.currentDisplayedContact[0],
        currentDisplayedContactScreen: state.contactManagment.currentDisplayedContactScreen
    }
}

export default connect(mapStateToProps)(HeaderComponent)

