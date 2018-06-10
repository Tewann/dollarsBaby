//Components/ContactItem/ContactItem.js
//Component: display each contact

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

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

const styles = StyleSheet.create({
    main_container: {
        height: 200
    },
    contact_text: {
        height: 50
    }
})

export default ContactItem