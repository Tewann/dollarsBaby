// src/Components/ProfilScreenComponents/ChangeProfilImageBlockComponent/ChangeProfilImageBlock.js
// Image Picker block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'


class ChangeProfilImageBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayImagePicker: 'text',
            errorMessage: null,
        }
    }

    // Switch between text and text input display
    _switchBetweenImagePickerTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayImagePicker: 'input' })
        }
        else if (goTo === 'text') {
            this.setState({ displayImagePicker: 'text' })
        }
    }

    _openImageLibrary = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return
            }
            else if (response.error) {
                this.setState({ errorMessage: response.error })
            }
            else {
                let requireSource = { uri: response.uri }
                this.props.updateAvatar(requireSource)
            }
        });
    }

    _openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                return
            }
            else if (response.error) {
                this.setState({ errorMessage: response.error })
            }
            else {
                let requireSource = { uri: response.uri }
                this.props.updateAvatar(requireSource)
            }
        });
    }

    _displayImagePicker() {
        if (this.state.displayImagePicker === 'text') {
            return (
                <TouchableOpacity
                    style={styles.profil_item}
                    onPress={() => this._switchBetweenImagePickerTextandInput('input')}
                >
                    <Text>Charger une photo de profil</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayImagePicker === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            Erreur : {this.state.errorMessage}
                        </Text>}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => this._openImageLibrary()}
                        >
                            <Ionicons
                                name='ios-images'
                                size={64}
                            />
                            <Text style={{ paddingLeft: 5 }}>Galerie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._openCamera()}
                        >
                            <Ionicons
                                name='ios-camera'
                                size={64}
                            />
                            <Text style={{ paddingLeft: 5 }}>Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._switchBetweenImagePickerTextandInput('text')}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            colors={['#88b097', '#889eb0']}
                            style={styles.button}
                        >
                            <Icon
                                name='arrow-back'
                                color='white'
                            />
                            <Text style={styles.button_text}>Annuler</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            )
        }
    }
    render() {
        return this._displayImagePicker()

    }
}

export default ChangeProfilImageBlock