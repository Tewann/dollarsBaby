// src/Components/MessageHistoryComponents/DisplayMessage/DisplayMessage.js
// Component : display each iteration of messages received

import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import { connect } from 'react-redux'

class DisplayMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png')
        }
    }
    _renderImage = () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.message.contact)
        let uri = this.props.contactList[contactNameIndex].photoUrl
        const backUpUri = '../../../../images/ic_tag_faces.png'
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

    // display different icons if message is send or received
    _renderIcon() {
        if (this.props.message.type === 'send') {
            return (
                <MaterialCommunityIcons
                    name='message-text'
                    type='MaterialCommunityIcons'
                    size={15}
                    color='orange'
                    style={{ paddingTop: 2 }}
                />
            )
        } else {
            return (
                <Icon
                    name='arrow-down-right'
                    type='feather'
                    color='orange'
                    size={15}
                />
            )
        }
    }

    // display time
    _renderTime() {
        let displayDate = ''
        // get timestamp from message
        // convert timestamp into day, month, hour, minute
        const timeStamp = this.props.message.timeStamp
        const day = new Date(timeStamp).getDate()
        const month = new Date(timeStamp).getMonth()
        const hour = new Date(timeStamp).getHours()
        const minute = new Date(timeStamp).getMinutes()

        // get actual timestamp
        const actualDay = new Date().getDate()

        if (day === actualDay) {
            // if day of displaying is day of timestamp message
            // display hour:min
            displayDate = `${hour}:${minute}`
        } else {
            // if day of displaying is not day of timestamp message
            // display day:month
            displayDay = day < 10 ? `0${day}` : day
            displayMonth = month < 10 ? `0${month}` : month
            displayDate = `${displayDay}/${displayMonth}`
        }

        return (
            <View style={styles.time}>
                <Text>{displayDate}</Text>
            </View>
        )
    }

    render() {
        const { message } = this.props
        return (
            <View style={styles.main_container}>
                <View style={styles.function_container}>
                    <View>
                        {this._renderImage()}
                        <Text style={styles.contact_name}>
                            {message.contact}
                        </Text>
                    </View>
                    <View style={styles.messages_container}>
                        <View style={styles.predefined_message_and_arrow_container}>
                            {this._renderIcon()}
                            <Text style={styles.predefined_message}>
                                {message.predefined_message}
                            </Text>
                        </View>
                        <Text style={styles.additionnal_message}>
                            {message.additionnal_message}
                        </Text>
                    </View>
                    {this._renderTime()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(DisplayMessage)

