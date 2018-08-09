// src/Components/ContactScreenComponents/ContactsScreen/HeaderContactList.js
// Component on top of flatlist from ContactScreen

import React from 'react'
import { TouchableOpacity, TextInput, View, Text, Alert } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { doesContactExists, sendMessageToFirestore } from '../../../Services/firebaseFunctions'

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

    _addContact = async () => {
        if (this.state.contactName.length > 0) {
            // if contactname is not empty
            // call firebase function
            // checks if user exists
            var contactRequest = await doesContactExists(this.state.contactName)
                .then(() => {
                    // if user exists, calls firebase function
                    // send message
                    const timeStamp = new Date().getTime();
                    const currentUser = this.props.currentUser.name
                    const contact = this.state.contactName
                    const id = `${currentUser}_${timeStamp}`
                    const predefined_message = `Demande de contact`
                    const additional_message = null
                    sendMessageToFirestore(currentUser, contact, predefined_message, additional_message, timeStamp, id )
                })
                .catch(err => {
                    // user doesn't exist
                    Alert.alert(
                        'Erreur',
                        err,
                        [
                            { text: 'Fermer' }
                        ]
                    )
                })
        } else {
            // else display error message
            Alert.alert(
                'Erreur',
                "Vous n'avez pas entré de nom de contact",
                [
                    { text: 'Fermer' }
                ]
            )
        }
        this.messageInput.clear()
        this.setState({ contactName: "" })
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
                        placeholder='Rechercher / Ajouter un contact'
                        onChangeText={(text) => this._contactNameInputChanged(text)}
                        onSubmitEditing={() => this._addContact()}
                        autoFocus={false}
                        style={styles.text_input}
                        underlineColorAndroid={'transparent'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <TouchableOpacity
                        onPress={() => this._addContact()}
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
    }
}

export default connect(mapStateToProps)(HeaderContactList)