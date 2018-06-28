// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsModalContactItem/GroupOptionsModalContactItem.js
// Display each iteration of group options contact list

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

class GroupOptionsModalContactItem extends React.Component {

    render() {
        const contact = this.props.contact
        const hideModalandAddContactToGroup = this.props.hideModalandAddContactToGroup
        return (

            <TouchableOpacity
                onPress={() => hideModalandAddContactToGroup(contact.id, contact.name)}
                style={styles.main_container}>
                <View style={styles.rounds}/>
                <Text style={styles.contact_text}>
                    {contact.name}
                </Text>
            </TouchableOpacity >

        )
    }
}

export default GroupOptionsModalContactItem