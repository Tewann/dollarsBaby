//src/Components/ContactsScreen/ContactsScreen.js
//Componenet: main View for contact screen

import React from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'
import contacts from '../../HelperContact'
import ContactItem from '../ContactItem/ContactItem'

class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts:  contacts,

        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.state.contacts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ContactItem contact={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
})

export default ContactsScreen