//src/Components/ContactsScreen/ContactsScreen.js
//Componenet: main View for contact screen

import React from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'
import ContactItem from '../ContactItem/ContactItem'
import { connect } from 'react-redux'
import styles from './styles'

class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.props.contactList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ContactItem contact={item} />}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactList: state.contactList
    }
}

export default connect(mapStateToProps)(ContactsScreen)