// src/Components/ContactScreenComponents/ContactsScreen/HeaderContactList.js
// Component on top of flatlist from ContactScreen

import React from 'react'
import { TouchableOpacity, TextInput, View, Text, Alert } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { doesContactExists, sendMessageToFirestore } from '../../../Services/firebaseFunctions'
import { strings } from '../../../i18n'

class HeaderContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactName: "",
            errorMessage: null
        }
    }


    _contactNameInputChanged(text) {
        this.setState({ contactName: text, errorMessage: null })
    }

    // check if contact is already in contact list
    // then calls add contact function
    _checkIfContactAlreadyInUserContactListThenAddContact = async () => {
        const contactNameIndex = this.props.contactList.findIndex(item =>
            item.name === this.state.contactName)
            if (contactNameIndex !== -1) {
                Alert.alert(
                    strings('contacts_screen.header_contact_list.error_title'),
                    strings('contacts_screen.header_contact_list.error_message'),
                    [
                        { text: strings('contacts_screen.header_contact_list.close_button') }
                    ]
                )
            } else {
                const addContact = await this._addContact()
            }
            //this.messageInput.clear()
            //this.setState({ contactName: "" })
    }

    _addContact = async () => {
        if (this.state.contactName.length > 0) {
            // if contactname is not empty
            // call firebase function
            // checks if user exists
            var contactRequest = await doesContactExists(this.state.contactName)
                .then(async () => {
                    // if user exists, calls firebase function
                    // send message
                    const timeStamp = new Date().getTime();
                    const currentUser = this.props.currentUser.name
                    const contact = this.state.contactName
                    const id = `${currentUser}_${timeStamp}`
                    const predefined_message = strings('contacts_screen.header_contact_list.predefined_message_contact_request')
                    const additional_message = ""
                    const type = 'contact_request'
                    const sound = '1 - Blink'
                    const sendingRequest = await sendMessageToFirestore(currentUser, contact, predefined_message, additional_message, timeStamp, id, type, sound)
                        .then(() => {
                            // if firebase function worked, update redux store
                            const type = 'send_contact_request'
                            const action = { type: 'MESSAGE_SENDED', value: { contact, predefined_message, additional_message, timeStamp, id, type } }
                            this.props.dispatch(action)
                            this.setState({ errorMessage: strings('contacts_screen.header_contact_list.contact_request_send') })
                            setTimeout(() => this.setState({ errorMessage: null }), 4000)
                        })
                        .catch(err => this.setState({ errorMessage: err }))
                })
                .catch(err => {
                    // user doesn't exist
                    Alert.alert(
                        strings('contacts_screen.header_contact_list.error_title'),
                        err,
                        [
                            { text: strings('contacts_screen.header_contact_list.close_button') }
                        ]
                    )
                })
        } else {
            // else display error message
            Alert.alert(
                strings('contacts_screen.header_contact_list.error_title'),
                strings('contacts_screen.header_contact_list.error_message2'),
                [
                    { text: strings('contacts_screen.header_contact_list.close_button') }
                ]
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                        {this.state.errorMessage}
                    </Text>
                }
                <View style={styles.add_contact_container}>
                    <TextInput
                        placeholder={strings('contacts_screen.header_contact_list.placeholder')}
                        placeholderTextColor={'lightgrey'}
                        onChangeText={(text) => this._contactNameInputChanged(text)}
                        onSubmitEditing={() => this._checkIfContactAlreadyInUserContactListThenAddContact()}
                        autoFocus={false}
                        style={styles.text_input}
                        underlineColorAndroid={'transparent'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <TouchableOpacity
                        onPress={() => this._checkIfContactAlreadyInUserContactListThenAddContact()}
                        style={styles.cross}>
                        <View style={styles.crossUp} />
                        <View style={styles.crossFlat} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(HeaderContactList)