// src/Components/ProfilScreenComponents/DeleteAccountBlockComponent/DeleteAccountBlock.js
// Delete account block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'


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
            this.setState({ errorMessage: "Merci d'indiquer votre adresse mail" })

            // if password text input empty
        } else if (this.state.currentPassword === null) {
            this.setState({ errorMessage: "Merci d'indiquer votre mot de passe" })

            // delete account
        }  else {
            this.setState({ errorMessage: null })

            this.reauthenticate(this.state.currentPassword).then(() => {
                firebase.auth().currentUser.delete().then(() => {
                    Alert.alert(
                        'Votre compte a été supprimé'
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
                    <Text>Supprimer mon compte</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayDeleteAccount === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 5 }}>
                            Erreur : {this.state.errorMessage}
                        </Text>}
                    {this.state.messageSuccess &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.messageSuccess}
                        </Text>}
                    <TextInput
                        placeholder="Confirmer votre adresse mail"
                        onChangeText={(text) => this._confirmMailInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder="Mot de passe actuel"
                        onChangeText={(text) => this._currentPasswordChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._deleteAccount()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <Icon
                                name='delete-forever'
                                color='white'
                            />
                            <Text style={styles.button_text}>Supprimer mon compte</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._switchBetweenDeleteAccountTextandInput('text')}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <Icon
                                name='arrow-back'
                                color='white'
                            />
                            <Text style={styles.button_text}>Annuler</Text>
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

export default DeleteAccountBlock