// src/Components/GroupScreenComponents/GroupScreenComponent/HeaderGroupContactList/HeaderGroupContactList.js
// Header of group options contact flatlist

import React from 'react'
import { TouchableOpacity, View, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import GroupOptionsModalContactItem from './GroupOptionsModalContactItem/GroupOptionsModalContactItem'

class HeaderGroupContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
        addContactToGroup = this.props.addContactToGroup

    }

    _displayModal() {
        this.setState({ isVisible: true })
    }

    _hideModalandAddContactToGroup = (contactId, contactName) => {
        this.setState({ isVisible: false })
        addContactToGroup(contactId, contactName)
    }
    render() {
        return (
            <TouchableOpacity style={styles.main_container}
                onPress={() => this._displayModal()}>
                <View
                    style={styles.cross}>
                    <View style={styles.crossUp} />
                    <View style={styles.crossFlat} />
                </View>
                <View >
                    <Modal
                        visible={this.state.isVisible}
                        onRequestClose={() => { this.setState({ isVisible: false }) }}
                        onBackdropPress={() => { this.setState({ isVisible: false }) }}
                        animationType='slide'
                        style={styles.modal_container}
                    >
                        <View style={styles.flatlist_container}>
                            <FlatList
                                data={this.props.contactList}
                                numColumns={2}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <GroupOptionsModalContactItem 
                                contact={item}
                                hideModalandAddContactToGroup={(contactId, contactName) => this._hideModalandAddContactToGroup(contactId, contactName)} />}
                            />
                        </View>
                    </Modal>
                </View>
            </TouchableOpacity>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList
    }
}

export default connect(mapStateToProps)(HeaderGroupContactList)