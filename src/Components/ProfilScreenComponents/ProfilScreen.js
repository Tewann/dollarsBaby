// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import MailAdressBlock from './MailAdressBlockComponent/MailAdressBlock'
import PasswordBlock from './PasswordBlockComponent/PasswordBlock'
import firebase from 'react-native-firebase'

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: require('../../../images/ic_tag_faces.png'),
            errorMessage: null,
            email: firebase.auth().currentUser.email
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
                this.setState({ errorMessage: response.error })
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

    _updateMail = () => {
        const email = firebase.auth().currentUser.email
        this.setState({ email: email})
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}
            >
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
                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={-96}
                    >
                        <View style={styles.avatar_container}>
                            <Image
                                style={styles.avatar_image}
                                source={this.state.avatar}
                            />
                            <Text style={styles.username}>Nom d'utilisateur</Text>
                            <Text style={{ marginTop: 20, fontStyle: 'italic' }}>{this.state.email}</Text>
                            {this.state.errorMessage &&
                                <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                                    Erreur : {this.state.errorMessage}
                                </Text>}
                        </View>
                        <View style={styles.profil_item_containers}>
                            <MailAdressBlock updateMail={() => this._updateMail()}/>
                            <PasswordBlock />
                            <TouchableOpacity
                                style={styles.profil_item}
                                onPress={this._modifyAvatarImage}
                            >
                                <Text>Charger une photo de profil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profil_item}
                            >
                                <Text>Supprimer mon compte</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

export default ProfilScreen