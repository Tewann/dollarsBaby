//src/Components/ContactsScreen/ContactsScreen.js
//Componenet: main View for contact screen

import React from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'
import ContactItem from '../ContactItem/ContactItem'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import styles from './styles'
import Modal from 'react-native-modal'

class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }


    _showMessages = () => {
        this.setState({ modalVisible: true });
    }


    render() {
        return (
            <View style={styles.main_container}>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }) }}
                    onBackdropPress={() => { this.setState({ modalVisible: false }) }}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={styles.modal_container}>
                        <FlatList
                            data={this.props.messagesList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MessageItem message={item} />}
                        />
                    </View>

                </Modal>

                <FlatList
                    data={this.props.contactList}
                    numColumns={3}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ContactItem contact={item}
                        showMessages={this._showMessages}
                    />}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        messagesList: state.displayMessagesList.messagesList,
        messageListPosition: state.displayMessagesList.messageListPosition
    }
}

export default connect(mapStateToProps)(ContactsScreen)