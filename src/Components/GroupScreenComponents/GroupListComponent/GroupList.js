// src/Components/GroupScreenComponents/GroupScreenComponent/GroupList/GroupList.js
// Component Group List on Group Screen

import React from 'react'
import { Text, TouchableOpacity, View, TextInput, FlatList, Alert } from 'react-native'
import styles from './styles'
import GroupItem from './GroupItem/GroupItem'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { createPublicGroupInFirestore, joinPublicGroupInFirestore } from '../../../Services/firebaseGroupFunctions'
import { Icon } from '../../../../node_modules/react-native-elements';

class GroupList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group: "",
            textInput: true,
            groupButtons: false,
            publicGroupButtons: false,
            errorMessage: null
        },
            switchScreen = this.props.switchScreen
    }

    _groupInputChanged(text) {
        this.setState({ group: text })
    }

    // displaying buttons : chosing public/private group
    _displayButtons() {
        this.setState({ textInput: false, groupButtons: true })
    }

    // displays default buttons (only text input for joining or creating groups)
    _displayTextInput() {
        this.setState({ textInput: true, groupButtons: false, publicGroupButtons: false, group: "" })
    }

    _displayPublicGroupButtons() {
        this.setState({ groupButtons: false, publicGroupButtons: true })
    }

    // create public group
    // called when created public group pressed
    // if group name already exist
    // displays (publicgroupbuttons) button to join public group
    _createPublicGroup = async () => {
        if (this.state.group.length > 0) {
            // if input lenght is > 0
            // calls firebase function (checks if name avaible then create group)
            // if firebase function excuted calls reducer
            const createPublicGroup = await createPublicGroupInFirestore(this.state.group, this.props.currentUser.name)
                .then(() => {
                    const action = { type: 'CREATE_PUBLIC_GROUP', value: [this.state.group, this.props.currentUser.name] }
                    this.props.dispatch(action)
                    this.setState({ textInput: true, groupButtons: false })

                })
                .catch((error) => {
                    if (error => 'Group name taken') {
                        // if group already exists
                        // displays public group buttons (cancel and join group buttons)
                        this._displayPublicGroupButtons()
                    } else {
                        Alert.alert(
                            'Erreur',
                            error
                            [
                            { text: 'Fermer' }
                            ]
                        )
                    }
                })
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

    _joinPublicGroup = async () => {
        const joinPublicGroupFirestore = await joinPublicGroupInFirestore(this.state.group, this.props.currentUser.name, this.props.currentUser.registrationToken)
            .then((res) => {
                // function returns photo url and creator
                // grabs it and send action to the store
                const value = [groupName = this.state.group, photoURL = res.photoURL, creator = res.creator]
                const action = { type: 'JOIN_PUBLIC_GROUP', value: value }
                this.props.dispatch(action)
            })
            .catch(err => this.setState({ errorMessage: err }))
        this._displayTextInput()
        this.messageInput.clear()
    }

    _createPrivateGroup() {
        if (this.state.group.length > 0) {
            const action = { type: 'CREATE_PRIVATE_GROUP', value: this.state.group }
            this.props.dispatch(action)
            this.setState({ textInput: true, groupButtons: false })
            switchScreen()
        } else {
            this.setState({ textInput: true, groupButtons: false })
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
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        {this.state.errorMessage}
                    </Text>
                }
                {this.state.textInput &&
                    <View style={styles.top_container}>
                        <TextInput
                            placeholder='Ajouter un groupe'
                            onChangeText={(text) => this._groupInputChanged(text)}
                            onSubmitEditing={() => this._displayButtons()}
                            autoFocus={false}
                            style={styles.text_input}
                            underlineColorAndroid={'transparent'}
                            autoCorrect={false}
                            ref={component => this.messageInput = component}
                        />
                        <TouchableOpacity
                            onPress={() => this._displayButtons()}
                            style={styles.cross}>
                            <View style={styles.crossUp} />
                            <View style={styles.crossFlat} />
                        </TouchableOpacity>
                    </View>}

                {this.state.groupButtons &&
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._createPrivateGroup()}
                        >
                            <Text style={styles.text}>Groupe privé</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._createPublicGroup()}
                        >
                            <Text style={styles.text}>Groupe publique</Text>
                        </TouchableOpacity>
                        <Icon
                            name='keyboard-backspace'
                            onPress={() => this._displayTextInput()}

                        />
                    </View>
                }
                {this.state.publicGroupButtons &&
                    <View style={styles.button_container}>
                        <Text
                            style={{ textAlign: 'center', fontWeight: 'bold' }}
                        >
                            Groupe existant
                        </Text>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._joinPublicGroup()}
                        >
                            <Text style={styles.text}>Le rejoindre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._displayTextInput()}
                        >
                            <Text style={styles.text}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                }

                <FlatList
                    data={this.props.groupList}
                    numColumns={3}
                    style={{ marginBottom: 80 }}
                    keyboardShouldPersistTaps={'always'}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GroupItem
                        group={item}
                    />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(GroupList)