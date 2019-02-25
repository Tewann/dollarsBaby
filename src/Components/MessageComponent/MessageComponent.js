/**
* Displays the Message component for contacts, group and history screen :
*  - text input to join public groups in database or to create private/public group
*  - groups to render the search
*  - items of the flatlist are clickable => add group
* Props : 
*  - message : item from flatlist
*  - id : index
*  - contactOrGroupIndex : contactOrGroupIndex in message history
*  - type : contact / group / messagesHistory
*/


import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { strings } from '../../i18n'
import { connect } from 'react-redux'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import AcceptOrDecline from './AcceptOrDeclineComponent/AcceptOrDecline'
import Autolink from 'react-native-autolink';
import { sendMessageToFirestore } from '../../Services/firebaseFunctions'
import firebase from 'react-native-firebase';

class MessageComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../images/ic_tag_faces.png'),
            typeSame: null,
            typeSameForTime: null,
            displayResponses: null,
            predefinedResponses: null
        }
        this.prevMessTimeStamp = this.props.messagesHistory[this.props.contactOrGroupIndex].data[this.props.id + 1] !== undefined ? this.props.messagesHistory[this.props.contactOrGroupIndex].data[this.props.id + 1].timeStamp : null
    }

    componentWillMount = () => {
        if (this.props.type === 'group') {
            // Checks first if the last message display is of the same type (received or send)
            // prevMessType = gets last message type
            const prevMessSendBy = this.props.messagesHistory[this.props.contactOrGroupIndex].data[this.props.id - 1] !== undefined ? this.props.messagesHistory[this.props.contactOrGroupIndex].data[this.props.id - 1].sendBy : null
            const senderSame = this.isSenderSame(this.props.message.sendBy, prevMessSendBy)
            this.setState({ senderSame: senderSame })
        } else if (this.props.type === 'messagesHistory') {
            this.prevMessTimeStamp = this.props.messagesReceived[this.props.id + 1] !== undefined ? this.props.messagesReceived[this.props.id + 1].timeStamp : null
            const prevMessSendBy = this.props.messagesReceived[this.props.id + 1] !== undefined ? this.props.messagesReceived[this.props.id + 1].sendBy : null
            const senderSame = this.isSenderSame(this.props.message.sendBy, prevMessSendBy)
            this.setState({ senderSame: senderSame })
        }
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
                    item.name === this.props.message.sendBy)
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
            comparaisonTimeStamp[i] = `${month}` + `${date}`
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

    _renderSenderName = () => {
        if (this.props.type === 'group') {
            return (
                <Text style={styles.sender_name}>{this.props.message.sendBy}</Text>
            )
        } else if (this.props.type === 'messagesHistory') {
            let messageSendToGroupName = this.props.message.toGroup !== undefined ? ` @ ${this.props.message.toGroup}` : null
            return (
                <Text style={styles.sender_name}>{this.props.message.sendBy}{messageSendToGroupName}</Text>
            )
        }
    }

    _renderPredefinedResponses = () => {
        return (
            <View style={styles.flatlist_container}>
                <FlatList
                    data={this.state.predefinedResponses}
                    numColumns={2}
                    columnWrapperStyle={styles.flatlist}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => this._sendPredefinedResponse(item)}
                            style={styles.main_container_for_complements}>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }

    _getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                fetch(`https://api.opencagedata.com/geocode/v1/geojson?q=${position.coords.latitude}+${position.coords.longitude}&key=a7ef5976448c4efd9b2cf2dbc104846e&pretty=1`)
                    .then(async (response) => {
                        response.json()
                            .then(responseJson => {
                                const formattedLocation = responseJson.features[0].properties.formatted
                                const location = strings('contacts_screen.messages_list_screen.my_position') + formattedLocation
                                resolve(location)
                            })
                    })
                    .catch(err => console.log(err))
            })
        })
    }
    _sendPredefinedResponse = async (item) => {
        const timeStamp = new Date().getTime();
        const currentUser = this.props.currentUserName
        const contact = this.props.message.contact
        const predefined_message = this.props.message.predefined_message === 'Blink' ? 'Blink' : null
        let additionnal_message = this.props.message.predefined_message === 'Blink' ? "" : item.name
        const id = `${currentUser}_${timeStamp}`
        const type = 'received'
        const sound = this.props.message.sound
        let senderType = null

        if (this.props.message.toGroup) {
            const groupIndex = this.props.groupList.findIndex(item => item.name === contact)
            senderType = this.props.groupList[groupIndex].type
        } else {
            senderType = 'contact'
        }

        if (item.name === 'Location') {
            await this._getPosition()
                .then(res => additionnal_message = res)
                .catch((err) => {
                    console.log(err)
                    this.setState({ displayResponses: null, predefinedResponses: null })
                })
        }

        // Update redux store
        const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additionnal_message, timeStamp, id, type: 'send', senderType: senderType } }
        this.props.dispatch(action)

        this.setState({ displayResponses: null, predefinedResponses: null })

        // Message component has been called from contact screen
        if (senderType === 'contact') {
            // Send message
            sendMessageToFirestore(currentUser, contact, predefined_message, additionnal_message, timeStamp, id, type, sound)
                .catch(err => console.log(err))
        } else {
            const httpsCallable = firebase.functions().httpsCallable('messageSendToGroup')
            httpsCallable({
                groupType: senderType,
                displayName: this.props.message.toGroup,
                groupName: contact,
                sendBy: currentUser,
                predefined_message: predefined_message,
                additionalMessage: additionnal_message,
                imageDownloadUrl: null,
                timeStamp: timeStamp,
                id: id,
                sound: sound
            })
                .catch(httpsError => console.log('httpsCallable err' + httpsError))
        }
    }

    _grabsPredefinedResponses = () => {
        if (this.props.message.type === 'received' && this.state.displayResponses === null && this.props.message.predefined_message) {
            const predefinedMessage = this.props.predefinedMessagesList.find(element => {
                return element.sound === this.props.message.sound
            })
            this.setState({ displayResponses: true, predefinedResponses: predefinedMessage.responses })
        } else {
            this.setState({ displayResponses: null, predefinedResponses: null })
        }
    }

    _renderMessages() {
        if (this.props.type === 'messagesHistory' && this.props.message.type === 'contact_request' &&
            this.props.message.status !== 'accepted' && this.props.message.status !== 'declined') {
            // if message is contact request received displays customize predefined message
            return (
                <View >
                    <Text style={styles.predefined_message}>
                        {strings('message_history_screen.display_message.contact_request')}
                    </Text>
                    <AcceptOrDecline message={this.props.message} />
                </View>
            )
        } else if (this.props.message.type !== 'contact_request') {
            return (
                <TouchableOpacity onPress={() => this._grabsPredefinedResponses()}>
                    {
                        this.props.message.predefined_message != (null || undefined) &&
                        <Text style={styles.predefined_message}>
                            {this.props.message.predefined_message}
                        </Text>
                    }
                    {
                        this.props.message.imageUri != (null || undefined) &&
                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                            <ImageCacheProvider
                                ImageCacheManagerOptions={{ ttl: 100 }}>
                                <CachedImage
                                    source={this.props.message.imageUri}
                                    style={styles.image}
                                />
                            </ImageCacheProvider>
                        </View>
                    }
                    {
                        this.props.message.additionnal_message != "" &&
                        <Autolink
                            text={this.props.message.additionnal_message}
                            truncate={0}
                            hashtag="twitter"
                        />
                    }
                </TouchableOpacity>
            )
        } else {
            return (
                <View>
                    {this.props.message.predefined_message != (null || undefined) &&
                        <Text style={styles.predefined_message}>{strings('message_history_screen.display_message.new_conversation')}</Text>}
                </View>
            )
        }
    }

    _renderMessageContainer = () => {
        if (this.props.message.type === 'send') {
            // Message send
            return (
                <View style={styles.renderMessage_send_main_container}>
                    {this._renderTime()}
                    <View style={styles.send_container}>
                        {this._renderMessages()}
                    </View>
                    {this.props.type === 'group' && <View style={styles.image_container}>
                        {this._renderImage()}
                    </View>}
                </View>

            )
        } else {
            // Message received
            return (
                <View>
                    <View style={styles.renderMessage_main_container}>
                        {(this.props.type === 'group' /* || this.props.type === 'messagesHistory' */) && <View style={styles.image_container}>
                            {this._renderImage()}
                        </View>}
                        <View style={styles.received_container}>
                            {(this.props.type === 'group' || this.props.type === 'messagesHistory') &&
                                this._renderSenderName()
                                // <Text style={styles.sender_name}>{this.props.message.sendBy}</Text>
                            }
                            {this._renderMessages()}
                        </View>
                        {this._renderTime()}
                    </View>
                    {this.state.displayResponses && this._renderPredefinedResponses()}
                </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.main_container}>
                {(this.props.type === 'group' || this.props.type === 'contact') && this._renderDateContainer()}
                {this._renderMessageContainer()}
                {this.props.type === 'messagesHistory' && this._renderDateContainer()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        currentUserName: state.getCurrentUserInformations.name,
        currentUserProfilPicture: state.getCurrentUserInformations.userProfilPicture,
        messagesHistory: state.displayMessagesList.messagesHistory,
        messagesReceived: state.displayMessagesList.messagesReceived,
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
        currentDisplayedGroupName: state.groupManagment.currentDisplayedGroupName,
        groupList: state.groupManagment.groupList,
    }
}

export default connect(mapStateToProps)(MessageComponent)