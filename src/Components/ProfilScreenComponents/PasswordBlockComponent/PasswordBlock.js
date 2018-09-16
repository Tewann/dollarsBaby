// src/Components/ProfilScreenComponents/PasswordBlockComponent/PasswordBlock.js
// Password block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { strings } from '../../../i18n'


class PasswordBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayPassword: 'text',
            newPassword: "",
            confirmPassword: "",
            errorMessagePassword: null,
            currentPassword: null,
            messagePasswordUpdated: null,
        }
    }

    // Switch between text and text input display
    _switchBetweenPasswordTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayPassword: 'input' })
        }
        else if (goTo === 'text') {
            this.setState({ displayPassword: 'text' })
        }
    }

    // OnChangeText for first text input
    _newPasswordInputChanged(text) {
        this.setState({ newPassword: text })
    }

    // OnChangeText for second text input
    _confirmPasswordInputChanged(text) {
        this.setState({ confirmPassword: text })
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

    // Change password with errors and firebase
    _changePassword = () => {
        // if first text input empty
        if (this.state.newPassword === "") {
            this.setState({ errorMessagePassword: strings('profil_screen.password.new_psswd') })
            
            // if second text input empty
        } else if (this.state.confirmPassword === "") {
            this.setState({ errorMessagePassword: strings('profil_screen.password.new_psswd_2') })
            
            // if first text input different from second text input
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ errorMessagePassword: strings('profil_screen.password.psswd_not_matching') })
            
            //if first text input matches second text input
        } else if (this.state.newPassword === this.state.confirmPassword) {
            this.setState({ errorMessagePassword: null })

            this.reauthenticate(this.state.currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newPassword).then(() => {
                    this.setState({ messagePasswordUpdated: strings('profil_screen.password.psswd_modified') });
                    setTimeout(this._switchBetweenPasswordTextandInput, 1000, 'text');
                }).catch((error) => {
                    this.setState({ errorMessagePassword: error.message });
                })
            }).catch((error) => {
                this.setState({ errorMessagePassword: error.message });
            })
        }
    }

    _displayPassword() {
        if (this.state.displayPassword === 'text') {
            return (
                <TouchableOpacity
                    style={styles.profil_item}
                    onPress={() => this._switchBetweenPasswordTextandInput('input')}
                >
                    <Text>{strings('profil_screen.password.change_psswd')}</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayPassword === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessagePassword &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            {strings('profil_screen.password.error')} : {this.state.errorMessagePassword}
                        </Text>}
                    {this.state.messagePasswordUpdated &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.messagePasswordUpdated}
                        </Text>}
                    <TextInput
                        placeholder={strings('profil_screen.password.placeholder_1')}
                        onChangeText={(text) => this._currentPasswordChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder={strings('profil_screen.password.placeholder_2')}
                        onChangeText={(text) => this._newPasswordInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder={strings('profil_screen.password.placeholder_3')}
                        onChangeText={(text) => this._confirmPasswordInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._changePassword()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <Icon
                                name='cached'
                                color='white'
                            />
                            <Text style={styles.button_text}>{strings('profil_screen.password.change_psswd')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._switchBetweenPasswordTextandInput('text')}
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
                            <Text style={styles.button_text}>{strings('profil_screen.password.cancel')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return this._displayPassword()

    }
}

export default PasswordBlock