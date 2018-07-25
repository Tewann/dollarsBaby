// Component for GetDisplayName
// Grab profil picture and uploads it on firebase

import React from 'react'
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { uploadImage } from '../../../../Services/firebaseFunctions'

// variable to avoid "Can't find variable: options" when trying to open image picker or camera
var options = {};

class ProfilPhoto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            avatar: require('../../../../../images/ic_tag_faces.png'),
            button: 'save'
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
                this.setState({
                    avatar: requireSource,
                    button: 'save'
                })
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
                this.setState({
                    avatar: requireSource,
                    button: 'save'
                })
            }
        });
    }

    SaveOrNextscreenButton() {
        // default button
        // call _uploadPictureToFirebase()
        if (this.state.button === 'save') {
            return (
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this._uploadPictureToFirebase()}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        colors={['#88b097', '#889eb0']}
                        style={styles.button}
                    >
                        <FontAwesome
                            name='send'
                            color='white'
                        />
                        <Text style={styles.button_text}>Enregistrer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        }

        // go to next screen
        else if (this.state.button === 'nextscreen') {
            return (
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this._goToNextScreen()}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        colors={['#88b097', '#889eb0']}
                        style={styles.button}
                    >
                        <Icon
                            name='chevron-right'
                            type='entypo'
                            color='white'
                        />
                        <Text style={[styles.button_text, { paddingRight: 5 }]}>Continuer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        }
    }

    _uploadPictureToFirebase = () => {
        this.setState({ button: 'nextscreen' })
        uploadImage(this.state.avatar)
    }

    _goToNextScreen = () => {
        console.log('going to next screen')
    }

    render() {
        return (
            <View style={styles.profil_item}>
                <Text style={styles.title}>Photo de profil</Text>
                <View style={styles.avatar_container}>
                    <Image
                        style={styles.avatar_image}
                        source={this.state.avatar}
                    />
                </View>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontStyle: 'italic', }}>
                        {this.state.errorMessage}
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

                {this.SaveOrNextscreenButton()}


                <TouchableOpacity
                    onPress={() => this._goToNextScreen()}
                >
                    <Text style={styles.default_button}>Continuer sans photo de profil</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProfilPhoto