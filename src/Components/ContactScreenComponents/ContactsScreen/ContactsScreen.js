//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View, FlatList, TextInput, TouchableOpacity, Text, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements'
import ContactItem from '../ContactItem/ContactItem'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import styles from './styles'
import HeaderContactList from '../HeaderContactList/HeaderContactList'


class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalMessageListVisible: false,
            displayMessagesList: false,
            displayContactList: true
        }
    }

    // Updating redux state in order to send addionnal text with predefined messages
    _messageToSendChanged(text) {
        const action = { type: 'MESSAGE_TO_SEND', value: text }
        this.props.dispatch(action)
    }

    //Closing contact screen list + displaying message list screen
    _showMessagesList = () => {
        this.setState({ displayContactList: false });
        this.setState({ displayMessagesList: true });

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
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ContactItem contact={item}
                        showMessages={this._showMessagesList}
                    />}
                />
            )
        }
    }

    // Render for predefined message list screen
    _displayMessageList() {
        if (this.state.displayMessagesList) {
            return (
                <View style={styles.messagelist_main_container}>
                    <TouchableOpacity
                        style={styles.back_to_contacts}
                        onPressIn={this._returnToContactScreen}>
                        <Icon name='chevron-left' color='#889eb0' />
                        <Text style={styles.retour}>Retour</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Message 100 caractères maximum'
                        onChangeText={(text) => this._messageToSendChanged(text)}
                        //onSubmitEditing={() => {}}
                        style={styles.text_input}
                        underlineColorAndroid={'white'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <FlatList
                        data={this.props.predefinedMessagesList}
                        numColumns={2}
                        columnWrapperStyle={styles.flatlist}
                        keyboardShouldPersistTaps={'always'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MessageItem message={item}
                            returnToContactScreen={() => this._returnToContactScreen()} />}
                    />
                </View>

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
        messagesList: state.displayMessagesList.messagesList,
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
    }
}

export default connect(mapStateToProps)(ContactsScreen)