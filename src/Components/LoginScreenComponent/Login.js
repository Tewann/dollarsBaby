// src/Components/LoginScreenComponent/Login.js
// Login Screen

import React from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('MainStackNavigator'))
            .catch(error => {
                this.setState({ errorMessage: error.message })           
            })
    }

    _resetPassword = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>eBlink</Text>
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
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="******"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity onPress={this.handleLogin} >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.LoginButton}
                        colors={['#88b097', '#889eb0']}>
                        <Text style={styles.loginText}>Se connecter</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={styles.noAccount}>Créer un compte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ForgottenPsswrd')}
                >
                    <Text style={styles.noAccount}>Mot de passe oublié</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login

//colors={['#88b097', '#889eb0', '#88b097']}