// //src/Components/ContactsScreen/HeaderContactList.js
// Component on top of flatlist from ContactScreen

import React from 'react'
import { TouchableOpacity, Text, View, Modal } from 'react-native'
import styles from './styles'


class HeaderContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
        }
    }

    _addContact = () => {
        this.setState({ isVisible: true })
    }
    render() {
        return (
            <View style={styles.main_view}>

                <TouchableOpacity
                    onPress={this._addContact}
                    style={styles.cross}>
                    <View style={styles.crossUp} />
                    <View style={styles.crossFlat} />
                </TouchableOpacity>


                <View style={styles.modal_container}>
                    <Modal
                        visible={this.state.isVisible}
                        onRequestClose={() => { this.setState({ isVisible: false }) }}
                        onBackdropPress={() => { this.setState({ isVisible: false }) }}
                        transparent={true}
                        animationType='fade'
                    >
                        <View style={styles.modal_composent}>
                            <Text style={styles.modal_text}>TEST</Text>
                        </View>
                    </Modal>
                </View>

            </View>
        )
    }
}

export default HeaderContactList