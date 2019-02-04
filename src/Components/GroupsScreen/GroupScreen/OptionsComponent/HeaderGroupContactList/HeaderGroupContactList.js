// src/Components/GroupScreenComponents/GroupScreenComponent/HeaderGroupContactList/HeaderGroupContactList.js
// Header of group options contact flatlist

import React from 'react'
import { TouchableOpacity, View, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
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

    _hideModalandAddContactToGroup = (contactName) => {
        this.setState({ isVisible: false })
        addContactToGroup(contactName)
    }
    render() {
        return (
            <TouchableOpacity style={styles.main_container}
                onPress={() => this._displayModal()}>
                <Icon
                    name='plus-circle'
                    type='feather'
                    size={25}
                    color='grey'
                    
                />
                
                <View>
                    <Modal
                        visible={this.state.isVisible}
                        onRequestClose={() => { this.setState({ isVisible: false }) }}
                        onBackdropPress={() => { this.setState({ isVisible: false }) }}
                        animationType='slide'
                        style={styles.modal_container}                                               
                    >
                        <View style={styles.flatlist_container} elevation={10}>
                            <FlatList
                                data={this.props.contactList}
                                numColumns={2}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <GroupOptionsModalContactItem 
                                contact={item}
                                hideModalandAddContactToGroup={(contactName) => this._hideModalandAddContactToGroup(contactName)} />}
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