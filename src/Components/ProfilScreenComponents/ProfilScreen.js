// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: require('../../../images/ic_tag_faces.png'),
            displayMail: 'input',
            newMail: "",
            confirmMail: "",
            mailVerificationColor: 'black'
        }
        options = {
            title: 'Modifer mon image',
            takePhotoButtonTitle: 'Prendre une photo',
            chooseFromLibraryButtonTitle: 'Choisir une photo dans la galerie'
        }
    }

    _modifyAvatarImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log("L'utilisateur a annulé")
            }
            else if (response.error) {
                console.log('Erreur : ', response.error)
            }
            else {
                console.log('Photo : ', response.uri)
                let requireSource = { uri: response.uri }
                this.setState({
                    avatar: requireSource
                })
            }
        })
    }

    _switchBetweenMailTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayMail: 'input' })
        }
        else if (goTo === 'text') {
            this.setState({ displayMail: 'text' })
        }
    }

    _newMailInputChanged(text) {
        this.setState({ newMail: text })
    }

    _confirmMailInputChanged(text) {
        this.setState({ confirmMail: text })
    }

    _displayMail() {
        if (this.state.displayMail === 'text') {
            return (
                <TouchableOpacity
                    style={styles.profil_item}
                    onPress={() => this._switchBetweenMailTextandInput('input')}
                >
                    <Text>Modifier mon adresse mail</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayMail === 'input') {
            return (
                <View style={styles.profil_item}>
                    <TextInput
                        placeholder='Nouvelle adresse mail'
                        onChangeText={(text) => this._newMailInputChanged(text)}
                        autoFocus={false}
                        style={styles.text_input}
                        autoCorrect={false}
                    />
                    <TextInput
                        placeholder="Confirmer l'adresse mail"
                        onChangeText={(text) => this._confirmMailInputChanged(text)}
                        autoFocus={false}
                        style={[styles.text_input, { marginTop: 5 }]}
                        autoCorrect={false}
                    />
                </View>
            )
        }
    }
    render() {
        return (
            <View           >
                <LinearGradient
                    style={styles.header_container}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#88b097', '#3a485c', '#3a485c',]}>
                    <Icon
                        name='chevron-left'
                        color='white'
                        size={25}
                        style={{ paddingBottom: 20 }}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    />
                    <Text style={styles.title}>PROFIL     </Text>
                    <View></View>
                </LinearGradient>
                <KeyboardAvoidingView
                    behavior='position'
                >
                    <View style={styles.avatar_container}>
                        <Image
                            style={styles.avatar_image}
                            source={this.state.avatar}
                        />
                        <Text style={styles.username}>Nom d'utilisateur</Text>
                        <Text style={{ marginTop: 20, fontStyle: 'italic' }}>Adresse mail</Text>
                    </View>
                    <View style={styles.profil_item_containers}>
                        {this._displayMail()}
                        <View style={styles.profil_item}>
                            <Text>Modifier mon mot de passe</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.profil_item}
                            onPress={this._modifyAvatarImage}
                        >
                            <Text>Charger une photo de profil</Text>
                        </TouchableOpacity>
                        <View style={styles.profil_item}>
                            <Text>Supprimer mon compte</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default ProfilScreen