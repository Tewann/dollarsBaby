//src/Components/ContactScreenComponents/ContactsScreen/ContactsScreen.js
//Component: main View for contact screen

import React from 'react'
import { View, FlatList, Text, Button } from 'react-native'
import ContactItem from '../ContactItem/ContactItem'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'
import styles from './styles'
import Modal from 'react-native-modal'
import HeaderContactList from '../HeaderContactList/HeaderContactList'
import AddContact from '../AddContact/AddContact'


class ContactsScreen extends React.Component {
    constructor(props) {
        super(props)
        contactId = -1,
        this.state = {
            modalMessageListVisible: false,
            modalAddContactVisible: false,
        }
    }

    //Displaying Message List Modal
    //Getting contact ID
    _showMessages = (contactId) => {
        this.setState({ modalMessageListVisible: true });
        this.contactId = contactId
    }

    //Displaying Add Contact Modal
    _displayAddContactModal = () => {
        if (this.state.modalAddContactVisible) {
            this.setState({ modalAddContactVisible: false })
        } else {
            this.setState({ modalAddContactVisible: true })
        }
    }

    // Rendering FlatList Header (for now AddContactButton)
    renderHeader = () => {
        return <HeaderContactList addContact={this._displayAddContactModal} />
    }




    render() {
        return (
            <View style={styles.main_container}>

                {/*Message list modal*/}
                <Modal
                    visible={this.state.modalMessageListVisible}
                    onRequestClose={() => { this.setState({ modalMessageListVisible: false }) }}
                    onBackdropPress={() => { this.setState({ modalMessageListVisible: false }) }}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={styles.message_list_modal_container}>
                        <FlatList
                            data={this.props.messagesList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MessageItem message={item} 
                            />}
                        />
                    </View>

                </Modal>


                {/*Add Contact modal*/}
                <Modal
                    visible={this.state.modalAddContactVisible}
                    onRequestClose={() => { this.setState({ modalAddContactVisible: false }) }}
                    onBackdropPress={() => { this.setState({ modalAddContactVisible: false }) }}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={styles.addContact_container}>
                    <AddContact displayAddContactModal={this._displayAddContactModal}/>
                    </View>
                </Modal>


                {/*Contact list*/}
                <FlatList
                    data={this.props.contactList}
                    numColumns={3}
                    ListHeaderComponent={() => this.renderHeader()}
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