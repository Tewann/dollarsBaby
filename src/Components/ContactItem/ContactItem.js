//Components/ContactItem/ContactItem.js
//Component: display each contact

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

class ContactItem extends React.Component {
    render() {
        const contact = this.props.contact
        return (
            <View style={styles.main_container}>
                <Text style={styles.contact_text}>
                    {contact.nom}
                </Text>
            </View>
        )
    }
}



export default ContactItem