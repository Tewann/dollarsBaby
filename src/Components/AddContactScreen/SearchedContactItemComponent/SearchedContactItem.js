/**
* Called from the Add contact screen
* Displays the searched contact item component:
*  - for each iteration of the flatlist renders 
*  - contact name result
*  - item is clickable => add contact function
* Props : 
*  - contact = flatlist item
*  - setErrorMessage() => displays error message in the add contact screen
*  - navigateToMainStackNavigator() => this.props.navigation.navigate('MainStackNavigator')
*/


import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../i18n'

import { doesContactExists, sendMessageToFirestore } from '../../../Services/firebaseFunctions'
import { Icon } from 'react-native-elements'

class SearchedContactItem extends React.Component {
    constructor(props) {
        super(props)
        this.picture = require('../../../../images/ic_tag_faces.png')
        this.state = {
            contactRequestSended: false,
            defaultContainer: true,
            confirmationContainer: false,
        }
    }

    /**
     * Check if the contact is already in the contact list
     * If not calls the add function contact
     */
    _checkIfContactAlreadyInUserContactListThenAddContact = async () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.props.contact.name)
        if (contactNameIndex !== -1) {
            Alert.alert(
                strings('add_contact_screen.item.error_title'),
                strings('add_contact_screen.item.error_message'),
                [
                    { text: strings('add_contact_screen.item.close_button') }
                ]
            )
        } else {
            const addContact = await this._addContact()
        }
    }

    _addContact = async () => {
        if (this.state.defaultContainer) {
            this.setState({ defaultContainer: false, confirmationContainer: true })
        } else {
            // call firebase function
            // checks if user exists
            var contactRequest = await doesContactExists(this.props.contact.name)
                .then(async () => {
                    // if user exists, calls firebase function
                    // send message
                    const timeStamp = new Date().getTime();
                    const currentUser = this.props.currentUser.name
                    const contact = this.props.contact.name
                    const id = `${currentUser}_${timeStamp}`
                    const predefined_message = strings('add_contact_screen.item.predefined_message_contact_request')
                    const additional_message = ""
                    const type = 'contact_request'
                    const sound = 's1blink'
                    const sendingRequest = await sendMessageToFirestore(currentUser, contact, predefined_message, additional_message, timeStamp, id, type, sound)
                        .then(() => {
                            // if firebase function worked, update redux store
                            const type = 'send_contact_request'
                            const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additional_message, timeStamp, id, type } }
                            this.props.dispatch(action)
                            this.setState({ contactRequestSended: true, confirmationContainer: false })
                            setTimeout(() => {
                                this.props.navigateToMainStackNavigator()
                            }, 2000)
                        })
                        .catch(err => this.props.setErrorMessage(err))
                })
                .catch(err => {
                    // user doesn't exist
                    Alert.alert(
                        strings('add_contact_screen.item.error_title'),
                        err,
                        [
                            { text: strings('add_contact_screen.item.close_button') }
                        ]
                    )
                })
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._checkIfContactAlreadyInUserContactListThenAddContact()}>
                {this.state.defaultContainer &&
                    <View style={styles.defaultContainer}>
                        <Image
                            source={this.picture}
                            style={styles.rounds}
                        />
                        <Text style={styles.text}>
                            {this.props.contact.name}
                        </Text>
                    </View>
                }
                {this.state.confirmationContainer &&
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.text}>
                            {strings('add_contact_screen.item.send_request')}
                        </Text>
                        <Text style={styles.text}>
                            {this.props.contact.name}
                        </Text>
                    </View>
                }
                {this.state.contactRequestSended &&
                    <View style={styles.contactRequestSended}>
                        <Icon
                            name='check'
                            type='entypo'
                            color='green'
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(SearchedContactItem)