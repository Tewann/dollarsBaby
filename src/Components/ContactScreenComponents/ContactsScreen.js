//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View } from 'react-native'
//import { Icon } from 'react-native-elements'
import ContactsList from './ContactsList/ContactsList'
import { connect } from 'react-redux'
import styles from './styles'
import ContactScreen from './ContactScreen/ContactScreen'
import { strings } from '../../i18n'

class ContactsScreen extends React.Component {

    _displayContactsList() {
        if (this.props.display === 'ContactsList') {
            return (
                <ContactsList />
            )
        }
    }

    _displayContact() {
        if (this.props.display !== 'ContactsList') {
            return (
                <ContactScreen />
            )
        }
    }
    render() {
        return (
            <View style={styles.main_container}>
                {this._displayContactsList()}
                {this._displayContact()}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        display: state.contactManagment.currentDisplayedContact[0]
    }
}

export default connect(mapStateToProps)(ContactsScreen)
