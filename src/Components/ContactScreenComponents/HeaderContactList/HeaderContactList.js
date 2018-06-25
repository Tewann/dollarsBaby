// src/Components/ContactScreenComponents/ContactsScreen/HeaderContactList.js
// Component on top of flatlist from ContactScreen

import React from 'react'
import { TouchableOpacity, TextInput, View, Alert } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

class HeaderContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactName: "",
        }
    }


    _contactNameInputChanged(text) {
        this.setState({ contactName: text })
    }

    _addContact() {
        if (this.state.contactName.length > 0) {
            const action = { type: 'ADD_CONTACT', value: this.state.contactName }
            this.props.dispatch(action)
        } else {
            Alert.alert(
                'Erreur',
                "Le nom du contact doit avoir plus d'un caractère",
                [
                    { text: 'Fermer' }
                ]
            )
        }
        this.messageInput.clear()
    }

    render() {
        return (
            <View style={styles.main_view}>
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
        )
    }
}

export default connect()(HeaderContactList)