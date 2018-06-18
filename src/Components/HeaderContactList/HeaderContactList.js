// //src/Components/ContactsScreen/HeaderContactList.js
// Component on top of flatlist from ContactScreen

import React from 'react'
import { TouchableOpacity, Text, View, Modal } from 'react-native'
import styles from './styles'


class HeaderContactList extends React.Component {
    render() {
        const { addContact } = this.props
        return (
            <View style={styles.main_view}>
                <TouchableOpacity
                    onPress={() => addContact()}
                    style={styles.cross}>
                    <View style={styles.crossUp} />
                    <View style={styles.crossFlat} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default HeaderContactList