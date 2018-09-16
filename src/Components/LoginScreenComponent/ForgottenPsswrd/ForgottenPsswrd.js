// src/Components/LoginScreenComponent/ForgottenPsswrd/ForgottenPsswrd.js
// Forgotten Password Screen

import React from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'
import { strings } from '../../../i18n'

class ForgottenPsswrd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errorMessage: null
        }
    }



    _resetPassword = () => {
        console.log('reset')
        firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(this.setState({ errorMessage: strings('login_screen.forgotten_password.reset_psswd_mail') }))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{strings('login_screen.forgotten_password.psswd_forgot')}</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity onPress={this._resetPassword}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.SignUpButton}
                        colors={['#88b097', '#889eb0']}>
                        <Text style={styles.Text}>{strings('login_screen.forgotten_password.send_psswd')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.Text}>{strings('login_screen.forgotten_password.connect')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ForgottenPsswrd
