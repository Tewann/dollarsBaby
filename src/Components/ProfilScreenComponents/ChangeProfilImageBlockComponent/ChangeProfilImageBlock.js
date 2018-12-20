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
import { strings } from '../../../i18n'

// variable to avoid "Can't find variable: options" when trying to open image picker or camera
var options = {quality: 0.1};

class ChangeProfilImageBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayImagePicker: 'text',
            errorMessage: null,
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
                return
            }
            else {
                let requireSource = { uri: response.uri }
                this._uploadImageToFirebase(requireSource)
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
                return
            }
            else {
                let requireSource = { uri: response.uri }
                this._uploadImageToFirebase(requireSource)
            }
        });
    }


    _uploadImageToFirebase = async (requireSource) => {
        this.setState({ isLoading: true })
        const uploadURL = await uploadImage(requireSource)
        const action = { type: 'UPDATE_PROFIL_PICTURE', value: uploadURL }
        this.props.dispatch(action)
        this.setState({ isLoading: false, imageUploaded: true })
        setTimeout(() => {
            this.setState({ imageUploaded: false })
            this._switchBetweenImagePickerTextandInput('text')
        }, 2000)
    }

    _displayUploadToFirebaseButton() {
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator size='large' />
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
                        <Text style={styles.button_text}>{strings('profil_screen.change_profil_image.back')}</Text>
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
                    <Text>{strings('profil_screen.change_profil_image.load_image')}</Text>
                </TouchableOpacity>
            )
        }
        else if (this.state.displayImagePicker === 'input') {
            return (
                <View style={styles.profil_item}>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            {strings('profil_screen.change_profil_image.error')} : {this.state.errorMessage}
                        </Text>}
                    {this.state.imageUploaded &&
                        <Text style={{ color: 'green', fontStyle: 'italic', marginTop: 10, textAlign: 'center' }}>
                            {strings('profil_screen.change_profil_image.image_shared')}
                        </Text>}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => this._openImageLibrary()}
                        >
                            <Ionicons
                                name='ios-images'
                                size={64}
                            />
                            <Text style={{ paddingLeft: 5 }}>{strings('profil_screen.change_profil_image.library')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._openCamera()}
                        >
                            <Ionicons
                                name='ios-camera'
                                size={64}
                            />
                            <Text style={{ paddingLeft: 5 }}>{strings('profil_screen.change_profil_image.photo')}</Text>
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