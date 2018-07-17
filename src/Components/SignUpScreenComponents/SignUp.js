import React from 'react'
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import { createUserInCloudFirestore } from '../../Services/firebaseFunctions'

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


    handleSignUp = () => {
        if (this.state.email === '') {
            this.setState({ errorMessage: 'Merci de renseigner une adresse mail' })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Les mots de passe ne correspondent pas' })
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Main'))
                .catch(error => this.setState({ errorMessage: error.message }))
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
                    placeholder="Mot de passe"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(text) => this._getPassword(text)}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    secureTextEntry
                    placeholder="Confirmer votre mot de passe"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(text) => this._getConfirmationPassword(text)}
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
                </TouchableOpacity><TouchableOpacity
                    onPress={() => createUserInCloudFirestore()}
                >
                    <Text style={styles.Text}>Test</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SignUp