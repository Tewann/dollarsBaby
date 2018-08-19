// src/Components/GroupScreenComponents/GroupScreenComponent/GroupContactItem.js
// Component: display each iteration of contact list in group list

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

class GroupContactItem extends React.Component {

    render() {
        const contact = this.props.contact
        return (

            <TouchableOpacity
                style={styles.main_container}>
                <View style={styles.rounds}/>
                <Text style={styles.contact_text}>
                    {contact.nom}
                </Text>
            </TouchableOpacity >

        )
    }
}

export default GroupContactItem