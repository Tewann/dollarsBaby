// src/Components/ProfilScreenComponents/DeleteAccountBlockComponent/DeleteAccountBlock.js
// Delete account block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { strings } from '../../../i18n'
import { connect } from 'react-redux'
import { deleteContact, doesContactExistsAndWantToReceivedRequests } from '../../../Services/firebaseFunctions'
import { deleteGroup } from '../../../Services/firebaseGroupFunctions'

class DeleteAccountBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayDeleteAccount: 'text',
            errorMessage: null,
            currentMail: null,
            currentPassword: null,
            messageSuccess: null,
        }
    }

    // Switch between text and text input display
    _switchBetweenDeleteAccountTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayDeleteAccount: 'input' })
        }
        else if (goTo === 'text') {
            this.setState({ displayDeleteAccount: 'text' })
        }
    }

    // OnChangeText for first text input
    _confirmMailInputChanged(text) {
        this.setState({ currentMail: text })
    }

    // OnChangeText for password text input
    _currentPasswordChanged(text) {
        this.setState({ currentPassword: text })
    }

    // reauthenticate user to avoid ''this operation is sensitive and requires recent authentication''
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    // delete account with errors and firebase
    _deleteAccount = () => {
        // if first text input empty
        if (this.state.currentMail === null) {
            this.setState({ errorMessage: strings('profil_screen.delete_account.mail') })

            // if password text input empty
        } else if (this.state.currentPassword === null) {
            this.setState({ errorMessage: strings('profil_screen.delete_account.psswd') })

            // delete account
        } else {
            this.props.groupList.forEach(item => {
                deleteGroup(this.props.currentUser.name, item.name, item.type)
            })
            this.props.contactList.forEach(item => {
                deleteContact(this.props.currentUser.name, item.name)
            })

            firebase.firestore().collection('Users').doc(this.props.currentUser.name).get()
                .then(doc => {
                    firebase
                        .storage()
                        .ref(doc.get('photoName'))
                        .delete()
                })
            firebase.firestore().collection('Users').doc(this.props.currentUser.name).collection('SoundsDownloaded').get()
                .then(docs => {
                    docs.forEach(doc => {
                        firebase.firestore().doc(doc.ref._documentPath._parts.join('/').toString()).delete()
                    })
                })
            firebase.firestore().collection('Users').doc(this.props.currentUser.name).collection('SoundsUploaded').get()
                .then(docs => {
                    docs.forEach(doc => {
                        const soundStoragePosition = `usersSounds/${this.props.currentUser.name}/${doc.get('name')}`
                        firebase.storage().ref(soundStoragePosition).delete()
                        firebase.firestore().doc(doc.ref._documentPath._parts.join('/').toString()).delete()
                    })
                })

            this.setState({ errorMessage: null })
            
            firebase.firestore().collection('Users').doc(this.props.currentUser.name).delete()
            this.reauthenticate(this.state.currentPassword).then(() => {
                firebase.auth().currentUser.delete().then(() => {
                    Alert.alert(
                        strings('profil_screen.delete_account.account_deleted')
                    )

                }).catch((error) => {
                    this.setState({ errorMessage: error.message });
                })
            }).catch((error) => {
                this.setState({ errorMessage: error.message });
            })
        }
    }

    _displayDeleteAccount() {
        if (this.state.displayDeleteAccount === 'text') {
            return (
                <TouchableOpacity
                    style={styles.profil_item}
                    onPress={() => this._switchBetweenDeleteAccountTextandInput('input')}
                >
                    <Text>{strings('profil_screen.delete_account.delete_account')}</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayDeleteAccount === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 5 }}>
                            {strings('profil_screen.delete_account.error')} : {this.state.errorMessage}
                        </Text>}
                    {this.state.messageSuccess &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.messageSuccess}
                        </Text>}
                    <TextInput
                        placeholder={strings('profil_screen.delete_account.placeholder_1')}
                        onChangeText={(text) => this._confirmMailInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder={strings('profil_screen.delete_account.placeholder_2')}
                        onChangeText={(text) => this._currentPasswordChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={true}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._deleteAccount()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#07416b']}
                            style={styles.button}
                        >
                            <Icon
                                name='delete-forever'
                                color='white'
                            />
                            <Text style={styles.button_text}>{strings('profil_screen.delete_account.delete_account')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._switchBetweenDeleteAccountTextandInput('text')}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#07416b']}
                            style={styles.button}
                        >
                            <Icon
                                name='arrow-back'
                                color='white'
                            />
                            <Text style={styles.button_text}>{strings('profil_screen.delete_account.cancel')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return this._displayDeleteAccount()

    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contactManagment.contactList,
        currentUser: state.getCurrentUserInformations,
        groupList: state.groupManagment.groupList,
    }
}

export default connect(mapStateToProps)(DeleteAccountBlock)