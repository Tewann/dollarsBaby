// Component for GetDisplayName
// Grab account name and create account in cloud firestore

import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createUserInDatabase, loginToFirebase } from '../../../../Services/firebaseFunctions'
import firebase from 'react-native-firebase';

class AccountName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameInput: "",
            confirmNameInput: "",
            errorMessage: null,
            button: 'submit',
            placeholder1: "Votre nom d'utilisateur",
            placeholder2: "Confirmez votre nom d'utilisateur",
            secureTextEntry: false
        }
    }

    _nameInputChanged = (text) => {
        this.setState({ nameInput: text })
    }

    _verifyNameInputChanged = (text) => {
        this.setState({ confirmNameInput: text })
    }

    // Check if empty text input
    // Check if text input matches
    // else call firebase function and create user in database
    _defineAccountName = () => {
        if (this.state.nameInput === "") {
            this.setState({ errorMessage: "Merci de renseigner un nom d'utilisateur" })
        } else if (this.state.nameInput !== this.state.confirmNameInput) {
            this.setState({ errorMessage: "Les noms ne correspondent pas" })
        } else {
            createUserInDatabase(this.state.nameInput)
                .then(() => {
                    // getting props GetDisplayName Component
                    this.props.goToProfilPicture()
                })
                .catch((error) => {
                    // if user need to reconnect
                    // change state
                    // error message => you have to reconnect
                    // placeholders for text input changed to grab mail/psswrd
                    if (error === 'No user currently signed in') {
                        this.setState({
                            errorMessage: "Veuillez-vous reconnecter",
                            button: 'reconnect',
                            placeholder1: 'Adresse mail',
                            placeholder2: 'Mot de passe',
                            secureTextEntry: true,
                            nameInput: "",
                            confirmNameInput: "",
                        })
                    // if a user name is already set up for this mail adresse
                    // => redirect to next screen
                    } else if (error === "Already a user name for this mail adress") {
                        this.setState({ errorMessage: "Vous avez déjà un nom d'utilisateur"})
                        setTimeout(() => { this.props.goToProfilPicture()}, 2000)

                    }else {
                        this.setState({ errorMessage: error })
                    }
                })
        }
    }

    _reconnect = () => {
        loginToFirebase(this.state.nameInput, this.state.confirmNameInput)
            .then(() =>
                this.setState({
                    errorMessage: null,
                    button: 'submit',
                    placeholder1: "Votre nom d'utilisateur",
                    placeholder2: "Confirmez votre nom d'utilisateur",
                    secureTextEntry: false,
                    nameInput: "",
                    confirmNameInput: "",
                })
            )
            .catch((error) => {
                this.setState({ errorMessage: error })
            })
    }

    // change button if user needs to reconnect
    // (because of firebase)
    SubmitOrConnectButton() {
        // if the user doesn't need to reconnect
        // default button
        if (this.state.button === 'submit') {
            return (
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this._defineAccountName()}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        colors={['#88b097', '#889eb0']}
                        style={styles.button}
                    >
                        <FontAwesome
                            name='send'
                            color='white'
                        />
                        <Text style={styles.button_text}>Enregistrer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        }

        // if user needs to reconnect
        else if (this.state.button === 'reconnect') {
            return (
                <View>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._reconnect()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <FontAwesome
                                name='send'
                                color='white'
                            />
                            <Text style={styles.button_text}>Se reconnecter</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this.props.goToLogin()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <FontAwesome
                                name='send'
                                color='white'
                            />
                            <Text style={styles.button_text}>Revenir à l'écran d'accueil</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return (
            <View>
                <View style={styles.profil_item}>
                    <Text style={styles.title}>Nom d'utilisateur</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red',  fontStyle: 'italic', }}>
                            {this.state.errorMessage}
                        </Text>}
                    <TextInput
                        placeholder={this.state.placeholder1}
                        onChangeText={(text) => this._nameInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCapitalize='none'
                        value={this.state.nameInput}
                    />
                    <TextInput
                        placeholder={this.state.placeholder2}
                        onChangeText={(text) => this._verifyNameInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCapitalize='none'
                        secureTextEntry={this.state.secureTextEntry}
                        value={this.state.confirmNameInput}
                    />
                    {this.SubmitOrConnectButton()}
                </View>
            </View>
        )
    }
}


export default AccountName