// src/Components/GroupScreenComponents/GroupScreenComponent/GroupContactItem.js
// Component: display each iteration of contact list in group list

import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'

class GroupContactItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../images/ic_tag_faces.png')
        }
    }

    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact.name)
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
        const contact = this.props.contact
        return (

            <TouchableOpacity
                style={styles.main_container}>
                {this._renderImage()}
                <Text style={styles.contact_text}>
                    {contact.name}
                </Text>
            </TouchableOpacity >

        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(GroupContactItem)