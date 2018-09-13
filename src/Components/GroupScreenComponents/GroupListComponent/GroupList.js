// src/Components/GroupScreenComponents/GroupScreenComponent/GroupList/GroupList.js
// Component Group List on Group Screen

import React from 'react'
import { Text, TouchableOpacity, View, TextInput, FlatList, Alert } from 'react-native'
import styles from './styles'
import GroupItem from './GroupItem/GroupItem'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { createPublicGroupInFirestore, joinPublicGroupInFirestore, 
        createPrivateGroupInFirestore, addContactToPrivateGroup } from '../../../Services/firebaseGroupFunctions'
import { Icon } from '../../../../node_modules/react-native-elements';
<<<<<<< HEAD
import { strings } from '../../../i18n'

=======
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810

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
<<<<<<< HEAD
    }

    // displays default buttons (only text input for joining or creating groups)
    _displayTextInput() {
        this.setState({ textInput: true, groupButtons: false, publicGroupButtons: false, group: "" })
    }

    _displayPublicGroupButtons() {
        this.setState({ groupButtons: false, publicGroupButtons: true })
    }

=======
    }

    // displays default buttons (only text input for joining or creating groups)
    _displayTextInput() {
        this.setState({ textInput: true, groupButtons: false, publicGroupButtons: false, group: "" })
    }

    _displayPublicGroupButtons() {
        this.setState({ groupButtons: false, publicGroupButtons: true })
    }

>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
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
<<<<<<< HEAD
                            strings('groups_screen.group_list.error_title'),
                            error
                            [
                            { text: strings('groups_screen.group_list.close_button') }
=======
                            'Erreur',
                            error
                            [
                            { text: 'Fermer' }
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
                            ]
                        )
                    }
                })
        } else {
            this.setState({ isVisible: false })
            Alert.alert(
<<<<<<< HEAD
                strings('groups_screen.group_list.error_title'),
                strings('groups_screen.group_list.error_message')
                [
                { text: strings('groups_screen.group_list.close_button') }
=======
                'Erreur',
                "Vous n'avez pas saisi de valeur"
                [
                { text: 'Fermer' }
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
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

    _createPrivateGroup = async () => {
        if (this.state.group.length > 0) {
            // if input lenght is > 0
            // calls firebase function (checks if name avaible then create group)
            // if firebase function excuted calls reducer
            const createPrivateGroup = await createPrivateGroupInFirestore(this.state.group, this.props.currentUser.name)
                .then(async () => {
                    // if private group successfully created
                    // add creator to contact group list in firebase
                    const addContactToGroup = await addContactToPrivateGroup(this.state.group, this.props.currentUser.name)
                        .catch(err => {this.setState({errorMessage: err})})
                    const action = { type: 'CREATE_PRIVATE_GROUP', value: [this.state.group, this.props.currentUser.name] }
                    this.props.dispatch(action)
                    this._displayTextInput()

                })
                .catch((error) => {
                    if (error => 'Group name taken') {
                        // if group already exists
                        // displays public group buttons (cancel and join group buttons)
<<<<<<< HEAD
                        this.setState({ errorMessage: strings('groups_screen.group_list.error_message2')})
                        this._displayTextInput()
                    } else {
                        Alert.alert(
                            strings('groups_screen.group_list.error_title'),
                            error
                            [
                            { text: strings('groups_screen.group_list.close_button') }
=======
                        this.setState({ errorMessage: 'Ce nom de groupe est déjà pris'})
                        this._displayTextInput()
                    } else {
                        Alert.alert(
                            'Erreur',
                            error
                            [
                            { text: 'Fermer' }
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
                            ]
                        )
                    }
                })
        } else {
            this.setState({ isVisible: false })
            Alert.alert(
                strings('groups_screen.group_list.error_title'),
                strings('groups_screen.group_list.error_message')
                [
                { text: strings('groups_screen.group_list.close_button') }
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
<<<<<<< HEAD
                            placeholder={strings('groups_screen.group_list.placeholder')}
                            placeholderTextColor={'lightgrey'}
=======
                            placeholder='Ajouter un groupe'
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
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
<<<<<<< HEAD
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._createPrivateGroup()}
                        >
                            <Text style={styles.text}>{strings('groups_screen.group_list.private_group')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._createPublicGroup()}
                        >
                            <Text style={styles.text}>{strings('groups_screen.group_list.public_group')}</Text>
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
                            {strings('groups_screen.group_list.existing_group')}
                        </Text>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._joinPublicGroup()}
                        >
                            <Text style={styles.text}>{strings('groups_screen.group_list.join_group')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchable_container}
                            onPress={() => this._displayTextInput()}
                        >
                            <Text style={styles.text}>{strings('groups_screen.group_list.cancel')}</Text>
=======
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
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810
                        </TouchableOpacity>
                        <Icon
                            name='keyboard-backspace'
                            onPress={() => this._displayTextInput()}

                        />
                    </View>
                }
<<<<<<< HEAD
=======
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
>>>>>>> 4208c610f9f0e5f4728f6e817e6f7a9fc8c42810

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