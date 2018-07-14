// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: require('../../../images/ic_tag_faces.png')
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
                <View style={styles.avatar_container}>
                    <Image
                        style={styles.avatar_image}
                        source={this.state.avatar}
                    />
                    <Text style={styles.username}>Nom d'utilisateur</Text>
                    <Text style={{ marginTop: 20, fontStyle: 'italic' }}>Adresse mail</Text>
                </View>
                <View style={styles.profil_item_containers}>
                    <View style={styles.profil_item}>
                        <Text>Modifier mon adresse mail</Text>
                    </View>
                    <View style={styles.profil_item}>
                        <Text>Modifier mon mot de passe</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.profil_item}
                        onPress={this._modifyAvatarImage}
                    >
                        <Text>Modifier mon image</Text>
                    </TouchableOpacity>
                    <View style={styles.profil_item}>
                        <Text>Supprimer mon compte</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfilScreen