/**
* Called from ConversationComponent flatlist
* Displays DisplayMessage :
*  - contact avatar
*  - predefined and additionnal message
* Props : 
*  - message => item from the flatlist
*/

import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import { strings } from '../../../../../../i18n'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'

class DisplayMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../../../../images/ic_tag_faces.png'),
            senderSame: null,
            typeSameForTime: null
        }
        this.prevMessTimeStamp = this.props.messagesHistory[this.props.groupIndex].data[this.props.id + 1] !== undefined ? this.props.messagesHistory[this.props.groupIndex].data[this.props.id + 1].timeStamp : null
    }

    componentWillMount = () => {
        // Checks first if the last message display is of the same type (received or send)
        // prevMessType = gets last message type
        const prevMessSendBy = this.props.messagesHistory[this.props.groupIndex].data[this.props.id - 1] !== undefined ? this.props.messagesHistory[this.props.groupIndex].data[this.props.id - 1].sendBy : null
        //const nextMessSend = this.props.messagesHistory[this.props.groupIndex].data[this.props.id + 1] !== undefined ? this.props.messagesHistory[this.props.groupIndex].data[this.props.id + 1].sendBy : null
        const senderSame = this.isSenderSame(this.props.message.sendBy, prevMessSendBy)
        //const senderSameForTime = this.isTypeSame(this.props.message.type, nextMessType)
        //            this.setState({ typeSame: senderSame, typeSameForTime: senderSameForTime })
        this.setState({ senderSame: senderSame })
    }

    isSenderSame = (currentMessageSendBy, prevMessageSendBy) => {
        return currentMessageSendBy === prevMessageSendBy;
    }

    _renderImage = () => {
        // if last message is the same type: doesn't display image
        if (!this.state.senderSame) {
            let uri = null
            if (this.props.message.type == 'send') {
                // If the message is sended by the current user => grabs the user profil picture link in current global state
                uri = this.props.currentUserProfilPicture
            } else {
                // If the message is received => grabs profil picture from contact list in global state
                const contactNameIndex = this.props.contactList.findIndex(item =>
                    item.name === this.props.message.contact)
                uri = (contactNameIndex !== -1) ? this.props.contactList[contactNameIndex].photoUrl : null
            }

            if (uri === null) {
                // If the contact/currentUser does not have a specific avatar picture => return default picture
                return (
                    <Image
                        source={this.state.defaultPicture}
                        style={styles.rounds}
                    />
                )
            } else {
                // Return specific contact/currentUser picture
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
    }

    isHHmmSame = (timestamps) => {
        let comparaisonTimeStamp = []
        for (let i = 0; i < 2; i++) {
            const item = timestamps[i]
            const month = new Date(item).getMonth().toString()
            const date = new Date(item).getDate().toString()
            const hours = new Date(item).getHours().toString()
            const minutes = new Date(item).getMinutes().toString()
            comparaisonTimeStamp[i] = month + date + hours + minutes
        }
        return comparaisonTimeStamp[0] === comparaisonTimeStamp[1]
    }

    isMMDDSame = (timestamps) => {
        let comparaisonTimeStamp = []
        let month
        let date
        for (let i = 0; i < 2; i++) {
            const item = timestamps[i]
            month = new Date(item).getMonth()
            date = new Date(item).getDate()
            comparaisonTimeStamp[i] = month + date
        }
        if (comparaisonTimeStamp[0] !== comparaisonTimeStamp[1]) {
            return [month, date]
        }
    }

    _renderDateContainer = () => {
        const monthAndDay = this.isMMDDSame([this.prevMessTimeStamp, this.props.message.timeStamp])
        if (monthAndDay !== undefined) {
            const monthNames = [
                strings('month.january'),
                strings('month.february'),
                strings('month.march'),
                strings('month.april'),
                strings('month.may'),
                strings('month.june'),
                strings('month.july'),
                strings('month.august'),
                strings('month.september'),
                strings('month.october'),
                strings('month.november'),
                strings('month.december'),
            ];
            const month = monthNames[monthAndDay[0]]
            return (
                <View style={styles.main_date_container}>
                    <View style={styles.sub_container}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={styles.border_top_lign_container} />
                            <View style={styles.top_lign_container}></View>
                            <View style={styles.border_top_lign_container} />
                        </View>
                        <View style={styles.bottom_lign_container}></View>
                    </View>
                    <Text style={styles.date}>{monthAndDay[1]} {month}</Text>
                    <View style={styles.sub_container}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={styles.border_top_lign_container} />
                            <View style={styles.top_lign_container}></View>
                            <View style={styles.border_top_lign_container} />
                        </View>
                        <View style={styles.bottom_lign_container}></View>
                    </View>
                </View>
            )
        }
    }

    _renderTime() {
        //const prevMessTimeStamp = this.props.messagesHistory[this.props.contactIndex].data[this.props.id + 1] !== undefined ? this.props.messagesHistory[this.props.contactIndex].data[this.props.id + 1].timeStamp : null
        const hhmmSame = this.isHHmmSame([this.props.message.timeStamp, this.prevMessTimeStamp])
        if (!hhmmSame) {
            let displayDate = ''
            // get timestamp from message
            // convert timestamp into hour, minute
            const timeStamp = this.props.message.timeStamp
            const hour = new Date(timeStamp).getHours()
            const minute = new Date(timeStamp).getMinutes()

            // If hour/minute < 10 => add 0 before the hour/minute number to always display two numbers ('OX' / 'XX')
            displayHour = hour < 10 ? `0${hour}` : hour
            displayMinute = minute < 10 ? `0${minute}` : minute
            displayDate = `${displayHour}:${displayMinute}`

            return (
                <View style={styles.time_container}>
                    <Text style={styles.time}>{displayDate}</Text>
                </View>
            )
        }
    }

    _renderMessages() {
        if (this.props.message.type !== 'contact_request') {
            return (
                <View>
                    {
                        this.props.message.predefined_message != (null || undefined) &&
                        <Text
                            style={styles.predefined_message}
                        //style={this.props.message.type === 'send' ? [styles.predefined_message, { color: 'white'}] : [styles.predefined_message]}
                        >
                            {this.props.message.predefined_message}
                        </Text>
                    }
                    {
                        this.props.message.additionnal_message != "" &&
                        <Text
                            style={styles.additional_message}
                        //style={this.props.message.type === 'send' ? [styles.additional_message, { color: 'white'}] : [styles.additional_message]}
                        >
                            {this.props.message.additionnal_message}
                        </Text>
                    }
                </View>
            )
        }
    }

    _renderMessageContainer = (message) => {
        if (this.props.message.type === 'send') {
            // Message send
            return (
                <View style={styles.renderMessage_send_main_container}>
                    {this._renderTime()}
                    <View style={styles.send_both_messages_container}>
                        {this._renderMessages()}
                    </View>
                    <View style={styles.image_container}>
                        {this._renderImage()}
                    </View>
                </View>
            )
        } else {
            // Message received
            return (
                <View style={styles.renderMessage_main_container}>
                    <View style={styles.image_container}>
                        {this._renderImage()}
                    </View>
                    <View style={styles.both_messages_container}>
                        <Text style={styles.sender_name}>{this.props.message.sendBy}</Text>
                        {this._renderMessages()}
                    </View>
                    {this._renderTime()}
                </View>
            )
        }
    }

    render() {
        const { message } = this.props
        return (
            <View style={styles.main_container}>
                {this._renderDateContainer()}
                {this._renderMessageContainer(message)}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        currentUserProfilPicture: state.getCurrentUserInformations.userProfilPicture,
        messagesHistory: state.displayMessagesList.messagesHistory,
    }
}

export default connect(mapStateToProps)(DisplayMessage)

