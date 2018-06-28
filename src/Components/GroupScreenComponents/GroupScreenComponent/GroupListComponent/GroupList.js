// src/Components/GroupScreenComponents/GroupScreenComponent/GroupList/GroupList.js
// Component Group List on Group Screen

import React from 'react'
import { Text, TouchableOpacity, View, TextInput, FlatList, Alert } from 'react-native'
import styles from './styles'
import GroupItem from '../../GroupItem/GroupItem'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'

class GroupList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group: "",
            isVisible: false,
        },
            switchScreen = this.props.switchScreen
    }

    _groupInputChanged(text) {
        this.setState({ group: text })
    }

    _displayModal() {
        this.setState({ isVisible: true })
    }

    _createPrivateGroup() {
        if (this.state.group.length > 0) {
            const action = { type: 'CREATE_PRIVATE_GROUP', value: this.state.group }
            this.props.dispatch(action)
            this.setState({ isVisible: false })
            switchScreen()
        } else {
            this.setState({ isVisible: false })
            Alert.alert(
                'Erreur',
                "Vous n'avez pas saisi de valeur"
                [
                { text: 'Fermer' }
                ]
            )
        }
    }

    render() {
        return (
            <View>
                <Modal
                    visible={this.state.isVisible}
                    onRequestClose={() => { this.setState({ isVisible: false }) }}
                    onBackdropPress={() => { this.setState({ isVisible: false }) }}
                    animationType='fade'
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._createPrivateGroup()}>
                            <Text style={styles.text}>
                                Groupe privé
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable_container}>
                            <Text style={styles.text}>
                                Groupe public
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <View style={styles.top_container}>
                    <TextInput
                        placeholder='Ajouter un groupe'
                        onChangeText={(text) => this._groupInputChanged(text)}
                        onSubmitEditing={() => this._displayModal()}
                        autoFocus={false}
                        style={styles.text_input}
                        underlineColorAndroid={'transparent'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <TouchableOpacity
                        onPress={() => this._displayModal()}
                        style={styles.cross}>
                        <View style={styles.crossUp} />
                        <View style={styles.crossFlat} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.groupList}
                    numColumns={3}
                    keyboardShouldPersistTaps={'always'}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GroupItem
                        group={item}
                        switchScreen={(groupName, groupContacts, groupId) => switchScreen(groupName, groupContacts, groupId)} />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList
    }
}

export default connect(mapStateToProps)(GroupList)