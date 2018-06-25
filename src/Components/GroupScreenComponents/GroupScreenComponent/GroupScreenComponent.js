// src/Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent.js
// main view for group screen

import React from 'react'
import { View, FlatList, TouchableOpacity, TextInput, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import GroupItem from '../GroupItem/GroupItem'
import Modal from 'react-native-modal'

class GroupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group: "",
            isVisible: false
        }
    }

    _groupInputChanged(text) {
        this.setState({ group: text })
    }

    _displayModal() {
        this.setState({ isVisible: true })
    }


    render() {
        return (
            <View style={styles.main_container}>
                <Modal
                    visible={this.state.isVisible}
                    onRequestClose={() => { this.setState({ isVisible: false }) }}
                    onBackdropPress={() => { this.setState({ isVisible: false }) }}
                    animationType='fade'
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.touchable_container}>
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
                    renderItem={({ item }) => <GroupItem group={item} />}
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

export default connect(mapStateToProps)(GroupScreen)