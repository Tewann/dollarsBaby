import React from 'react'
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'


class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Créer un compte</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    secureTextEntry
                    placeholder="******"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity onPress={this.handleSignUp}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.SignUpButton}
                        colors={['#88b097', '#889eb0']}>
                        <Text style={styles.Text}>S'inscrire</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.Text}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SignUp