// src/Components/ProfilScreenComponents/MailAdressBlockComponent/MailAdressBlock.js
// Mail adress block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { strings } from '../../../i18n'
import Store from '../../../Store/configureStore'

class MailAdressBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMail: 'text',
            newMail: "",
            confirmMail: "",
            errorMessageMail: null,
            currentPassword: null,
            mailSucessfullyUpdated: null
        }
    }

    // Switch between text and text input display
    _switchBetweenMailTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayMail: 'input' })
        }
        else if (goTo === 'text') {
            this.setState({ displayMail: 'text' })
        }
    }

    // OnChangeText for first text input
    _newMailInputChanged(text) {
        this.setState({ newMail: text })
    }

    // OnChangeText for second text input
    _confirmMailInputChanged(text) {
        this.setState({ confirmMail: text })
    }

    // OnChangeText for password text input
    _passwordChanged(text) {
        this.setState({ currentPassword: text })
    }
    // reauthenticate user to avoid ''this operation is sensitive and requires recent authentication''
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    // Change adresse mail with errors and firebase
    _changeMailAdress = () => {
        // if first text input empty
        if (this.state.newMail === "") {
            this.setState({ errorMessageMail: strings('profil_screen.mail_adress.error_new_mail') })

            // if second text input empty
        } else if (this.state.confirmMail === "") {
            this.setState({ errorMessageMail: strings('profil_screen.mail_adress.error_confirm_mail') })

            // if first text input different from second text input
        } else if (this.state.newMail !== this.state.confirmMail) {
            this.setState({ errorMessageMail: strings('profil_screen.mail_adress.error_no_match') })

            //if first text input matches second text input
        } else if (this.state.newMail === this.state.confirmMail) {
            this.setState({ errorMessageMail: null })

            this.reauthenticate(this.state.currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(this.state.newMail).then(() => {
                    const action = { type: "SET_CURRENT_USER_EMAIL", value: this.state.newMail }
                    Store.dispatch(action)
                    this.setState({ mailSucessfullyUpdated: strings('profil_screen.mail_adress.mail_modified') });
                    setTimeout(this._switchBetweenMailTextandInput, 1000, 'text');
                }).catch((error) => {
                    this.setState({ errorMessageMail: error.message });
                })
            }).catch((error) => {
                this.setState({ errorMessageMail: error.message });
            })
        }
    }

    _displayMail() {
        if (this.state.displayMail === 'text') {
            return (
                <TouchableOpacity
                    style={styles.profil_item}
                    onPress={() => this._switchBetweenMailTextandInput('input')}
                >
                    <Text>{strings('profil_screen.mail_adress.modify_mail')}</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayMail === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessageMail &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            Erreur : {this.state.errorMessageMail}
                        </Text>}
                    {this.state.mailSucessfullyUpdated &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.mailSucessfullyUpdated}
                        </Text>}
                    <TextInput
                        placeholder={strings('profil_screen.mail_adress.placeholder_1')}
                        onChangeText={(text) => this._newMailInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder={strings('profil_screen.mail_adress.placeholder_2')}
                        onChangeText={(text) => this._confirmMailInputChanged(text)}
                        autoFocus={false}
                        style={[styles.text_input, { marginTop: 5 }]}
                        autoCorrect={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder={strings('profil_screen.mail_adress.placeholder_3')}
                        onChangeText={(text) => this._passwordChanged(text)}
                        autoFocus={false}
                        style={[styles.text_input, { marginTop: 5 }]}
                        autoCorrect={true}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._changeMailAdress()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#07416b']}
                            style={styles.button}
                        >
                            <Icon
                                name='cached'
                                color='white'
                            />
                            <Text style={styles.button_text}>{strings('profil_screen.mail_adress.modify_mail')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._switchBetweenMailTextandInput('text')}
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
                            <Text style={styles.button_text}>{strings('profil_screen.mail_adress.cancel')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return this._displayMail()

    }
}

export default MailAdressBlock