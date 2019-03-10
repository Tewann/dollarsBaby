//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { strings } from '../../../i18n'

import { Icon } from 'react-native-elements'

import ContactItem from './ContactItem/ContactItem'


class ContactsList extends React.Component {
    renderListEmpty = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.list_empty_text1}>{strings('contacts_screen.contacts_screen.list_empty')}</Text>
                <View style={styles.list_empty_text2_container}>
                    <Text >{strings('contacts_screen.contacts_screen.list_empty2')}</Text>
                    <Icon
                        name="menu"
                    />
                    <Text>{strings('contacts_screen.contacts_screen.list_empty3')}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={this.props.contactList}
                    extraData={this.props.contactList}
                    numColumns={3}
                    ListEmptyComponent={() => this.renderListEmpty()}
                    keyboardShouldPersistTaps={'handled'}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ContactItem contact={item} />}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        display: state.contactManagment.currentDisplayedContact
    }
}

export default connect(mapStateToProps)(ContactsList)
