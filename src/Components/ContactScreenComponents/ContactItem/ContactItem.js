// src/Components/ContactScreenComponents/ContactScreenComponents/ContactItem/ContactItem.js
// Component: display each iteration of contact list

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

class ContactItem extends React.Component {

    render() {
        const { contact, showMessages } = this.props
        return (

            <TouchableOpacity
                onPress={() => showMessages(contact.id)}
                style={styles.main_container}>
                <View style={styles.rounds}/>
                <Text style={styles.contact_text}>
                    {contact.nom}
                </Text>
            </TouchableOpacity >

        )
    }
}

export default ContactItem