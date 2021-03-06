// src/Components/SignUpScreenComponents/SignUpScreen.js
// Sign up screen

import React from 'react'
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import { signUpToFirebase } from '../../Services/firebaseFunctions'
import { strings } from '../../i18n'
import { Icon } from 'react-native-elements';

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: null
        }
    }

    componentDidMount() {
        firebase.auth().signOut().catch();
    }

    handleSignUp = () => {
        if (this.state.email === '') {
            this.setState({ errorMessage: strings('sign_up_screen.sign_up.mail_not_filled') })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: strings('sign_up_screen.sign_up.psswd_not_filled') })
        } else {
            signUpToFirebase(this.state.email, this.state.password)
                .then(async () => {
                    this.props.navigation.navigate('GetDisplayName')
                })
                .catch((error) => {
                    this.setState({ errorMessage: error })
                })
        }
    }

    // get initial password from first psswrd text input
    _getPassword = (text) => {
        this.setState({ password: text })
    }

    // get confirmation password from second psswrd text input
    _getConfirmationPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.container}
                    colors={['#88b097', '#07416b']}>
                    <Text style={styles.title}>{strings('sign_up_screen.sign_up.create_account')}</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                    <TextInput
                        placeholder={strings('sign_up_screen.sign_up.placeholder_1')}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        underlineColorAndroid='transparent'
                    />
                    <TextInput
                        secureTextEntry
                        placeholder={strings('sign_up_screen.sign_up.placeholder_2')}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(text) => this._getPassword(text)}
                        underlineColorAndroid='transparent'
                        value={this.state.password}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder={strings('sign_up_screen.sign_up.placeholder_3')}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(text) => this._getConfirmationPassword(text)}
                        underlineColorAndroid='transparent'
                        value={this.state.confirmPassword}
                    />
                    <TouchableOpacity onPress={this.handleSignUp}>
                        <View
                            //start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.SignUpButton}
                        //colors={['#88b097', '#07416b']}>
                        >
                            <Text style={styles.Text1}>{strings('sign_up_screen.sign_up.sign_up')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Icon name='ios-arrow-round-back'
                            type='ionicon'
                            size={35}
                            color='white'
                        />
                    </TouchableOpacity>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
}

export default SignUp