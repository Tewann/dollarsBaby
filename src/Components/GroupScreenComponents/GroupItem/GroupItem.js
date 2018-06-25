// src/Components/GroupScreenComponents/GroupItem/GroupItem.js
// Component: display each iteration of group list

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

class GroupItem extends React.Component {
    render() {
        const group = this.props.group
        return (
            <TouchableOpacity
            onPress={() => showMessages(contact.id)}
            style={styles.main_container}>
            <View style={styles.rounds}/>
            <Text style={styles.contact_text}>
                {group.nom}
            </Text>
        </TouchableOpacity >
        )
    }
}

export default GroupItem