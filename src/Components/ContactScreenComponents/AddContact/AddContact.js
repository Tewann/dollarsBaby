//src/Components/ContactScreenComponents/AddContact/AddContact.js
//Modal Component for contact adding

import React from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

class AddContact extends React.Component {
    constructor(props) {
        super(props)
        this.contactName = ""
        displayAddContactModal = this.props.displayAddContactModal
    }

    _contactNameInputChanged(text) {
        this.contactName = text
    }

    _addContact() {
        if (this.contactName.length > 0) {
            const action = { type: 'ADD_CONTACT', value: this.contactName }
            this.props.dispatch(action)
            displayAddContactModal()
        } else {
            Alert.alert(
                'Erreur',
                "Le nom du contact doit avoir plus d'un caractère",
                [
                    { text: 'Fermer' }
                ]
            )
        }
    }
    render() {
        return (
            <View style={styles.main_container} >
                <TextInput
                    placeholder='Nom du contact'
                    onChangeText={(text) => this._contactNameInputChanged(text)}
                    onSubmitEditing={() => this._addContact()}
                    autoFocus={true}
                    style={styles.text_input}
                    underlineColorAndroid={'white'}
                />
                <Button
                    title='Ajouter contact'
                    onPress={() => this._addContact()}
                />
            </View>
        )
    }
}

export default connect()(AddContact)