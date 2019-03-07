// src/Components/LoginScreenComponent/Login.js
// Login Screen

import React from 'react'
import { Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'
import { strings } from '../../i18n'
import { fetchContacts, setPlatformUsed } from '../../Services/firebaseFunctions'
import SplashScreen from 'react-native-splash-screen'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
    }

    handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async () => {
                // Set current user platform used to firestore profile
                const setPlatform = await setPlatformUsed()
                this.props.navigation.navigate('Loading')
            })
            .catch(error => {
                this.setState({ errorMessage: error.message })
                console.log('err', error)
            })
    }

    _resetPassword = () => {

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
                        <View
                            //start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.LoginButton}
                        //colors={['#88b097', '#07416b']}>
                        >
                            <Text style={styles.loginText}>{strings('login_screen.connect_button')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                        <Text style={styles.noAccount}>{strings('login_screen.create_account')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ForgottenPsswrd')}
                    >
                        <Text style={styles.noAccount}>{strings('login_screen.forgotten_psswd')}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
}

export default Login

//colors={['#88b097', '#07416b', '#88b097', '#88b097', '#07416b']}