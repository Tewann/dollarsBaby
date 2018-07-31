// src/Components/ProfilScreenComponents/ChangeProfilImageBlockComponent/ChangeProfilImageBlock.js
// Image Picker block component on Profil screen

import React from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { uploadImage } from '../../../Services/firebaseFunctions'


// variable to avoid "Can't find variable: options" when trying to open image picker or camera
var options = {};

class ChangeProfilImageBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayImagePicker: 'text',
            errorMessage: null,
            imageLocalUri: null,
            isLoading: false,
            imageUploaded: false
        }
    }

    // Switch between text and text input display
    _switchBetweenImagePickerTextandInput = (goTo) => {
        if (goTo === 'input') {
            this.setState({ displayImagePicker: 'input' })
        }
        // if user cancelled the process of changing image
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
                this.setState({ imageLocalUri: requireSource })
                // update redux store, image is changed on profil screen component
                const action = { type: 'UPDATE_PROFIL_PICTURE', value: requireSource }
                this.props.dispatch(action)
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
                this.setState({ imageLocalUri: requireSource })
                // update redux store, image is changed on profil screen component
                const action = { type: 'UPDATE_PROFIL_PICTURE', value: requireSource }
                this.props.dispatch(action)
            }
        });
    }

    // function passed to image picker block
    // get avatar.uri and modify profil state
    _uploadImageToFirebase = async () => {
        this.setState({ isLoading: true })
        const requireSource = this.state.imageLocalUri
        const uploadToFirebase = await uploadImage(requireSource)
        const action = { type: 'UPDATE_PROFIL_PICTURE', value: requireSource }
        this.props.dispatch(action)
        this.setState({ isLoading: false, imageUploaded: true })
        setTimeout(() => {
            this.setState({ imageUploaded: false })
            this._switchBetweenImagePickerTextandInput('text')
        }, 1000)
    }

    _displayUploadToFirebaseButton() {
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator size='large' />
            )
        } else if (this.state.imageLocalUri !== null) {
            return (
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this._uploadImageToFirebase()}
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
                        <Text style={styles.button_text}>Enregistrer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        } else {
            return (
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
            )
        }
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
                    {this.state.imageUploaded &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10, textAlign: 'center' }}>
                            L'image a été partagée
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

                    {this._displayUploadToFirebaseButton()}



                </View>
            )
        }
    }
    render() {
        return this._displayImagePicker()

    }
}


export default connect()(ChangeProfilImageBlock)