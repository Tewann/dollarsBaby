//Components/ContactItem/ContactItem.js
//Component: display each iteration of contact list

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'



class ContactItem extends React.Component {
    render() {
        const { contact, showMessages, positionItem } = this.props
        return (

            <TouchableOpacity
                onPressIn={(e) => positionItem(e)}
                onPress={() => showMessages()}
                style={styles.main_container}>
                <Text style={styles.contact_text}>
                    {contact.nom}
                </Text>

            </TouchableOpacity >

        )
    }
}



export default ContactItem