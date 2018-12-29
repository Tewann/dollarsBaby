/**
 * Called from Contact Screen
 * Displays the Header Component :
 *  - back button to return to the contact screen
 *  - contact photo
 *  - contact name
 * Starts backhandler listener for android
 * Props : 
 *  - displayContactsList : _displayContactsList() => function to navigate back to the contact screen
 */

import React from 'react'
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'


class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png'),
            additionnalMessage: "",
            errorMessage: null
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.displayContactsList(); // works best when the goBack is async
        return true;
    }

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact)
        let uri = this.props.contactList[contactNameIndex].photoUrl
        if (uri === null) {
            return (
                <TouchableOpacity styles={styles.avatar_container}>
                    <Image
                        source={this.state.defaultPicture}
                        style={styles.rounds}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.avatar_container}>
                    <ImageCacheProvider
                        ImageCacheManagerOptions={{ ttl: 100 }}>
                        <CachedImage
                            source={{ uri: uri }}
                            style={styles.rounds}
                        />
                    </ImageCacheProvider>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    style={styles.back_to_contacts}
                    onPressIn={() => this.props.displayContactsList()}>
                    <Icon name='arrow-left'
                        type='feather'
                        color='#889eb0'
                    />
                </TouchableOpacity>
                <View style= {styles.picture_and_name_container}>
                    {this._renderImage()}
                    <Text style={styles.username}>{this.props.contact}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        contact: state.contactManagment.currentDisplayedContact[0]
    }
}

export default connect(mapStateToProps)(HeaderComponent)

