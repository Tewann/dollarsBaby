//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View, FlatList, Text } from 'react-native'

import ContactItem from './ContactItem/ContactItem'
import HeaderContactList from './HeaderContactList/HeaderContactList'

import { connect } from 'react-redux'
import styles from './styles'
import { strings } from '../../../i18n'

class ContactsScreen extends React.Component {

    renderHeader = () => {
        return <HeaderContactList />
    }

    renderListEmpty = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.list_empty}>{strings('contacts_screen.contacts_screen.list_empty')}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.contactList}
                    numColumns={3}
                    ListHeaderComponent={() => this.renderHeader()}
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

export default connect(mapStateToProps)(ContactsScreen)
