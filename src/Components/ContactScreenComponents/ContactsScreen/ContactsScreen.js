//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View, FlatList, TextInput, TouchableOpacity, Text, BackHandler } from 'react-native'
//import { Icon } from 'react-native-elements'
import ContactItem from '../ContactItem/ContactItem'
//import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import styles from './styles'
import HeaderContactList from '../HeaderContactList/HeaderContactList'
import MessagesListScreen from '../MessagesListScreen/MessagesListScreen'


class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMessagesList: false,
            displayContactList: true,
            contact: null
        }
    }



    //Closing contact screen list + displaying message list screen
    _showMessagesList = (contact) => {
        this.setState({ displayContactList: false });
        this.setState({ displayMessagesList: true });
        this.setState({ contact: contact})

        // listener on android, when back button press
        BackHandler.addEventListener('hardwareBackPress', this._backHandler)
    }

    // on android function to return to contact screen list
    _backHandler = () => {
        this._returnToContactScreen()
        return true
    }

    //Closing Message list screen + displaying contact screen list
    _returnToContactScreen = () => {
        this.setState({ displayMessagesList: false })
        this.setState({ displayContactList: true })

        // closing listener on android, when back button press
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
    }

    // Rendering FlatList Header (for now AddContactButton)
    renderHeader = () => {
        return <HeaderContactList />
    }

    // Render for contact list screen
    _displayContactList() {
        if (this.state.displayContactList) {
            return (
                <FlatList
                    data={this.props.contactList}
                    numColumns={3}
                    ListHeaderComponent={() => this.renderHeader()}
                    keyboardShouldPersistTaps={'always'}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ContactItem contact={item}
                        showMessages={(contact) => this._showMessagesList(contact)}
                    />}
                />
            )
        }
    }

    // Render for predefined message list screen
    _displayMessageList() {
        if (this.state.displayMessagesList) {
            return (
                <MessagesListScreen
                    contact={this.state.contact}
                    returnToContactScreen={() => this._returnToContactScreen()}
                />
            )
        }
    }
    render() {
        return (
            <View style={styles.main_container}>
                {this._displayContactList()}
                {this._displayMessageList()}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
    }
}

export default connect(mapStateToProps)(ContactsScreen)
