// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import MailAdressBlock from './MailAdressBlockComponent/MailAdressBlock'
import PasswordBlock from './PasswordBlockComponent/PasswordBlock'
import ChangeProfilImageBlock from './ChangeProfilImageBlockComponent/ChangeProfilImageBlock.js'
import DeleteAccountBlock from './DeleteAccountBlockComponent/DeleteAccountBlock'
import { connect } from 'react-redux'
import { strings } from '../../i18n'
import { isIphoneX } from '../../Services/is-iphone-x'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import ImagePicker from 'react-native-image-picker'
import { uploadImage } from '../../Services/firebaseFunctions'


var options = {
    quality: 0.1,
    title: strings('profil_screen.image_picker_title'),
    takePhotoButtonTitle: strings('profil_screen.take_photo_button'),
    chooseFromLibraryButtonTitle: strings('profil_screen.open_library_button'),
    cancelButtonTitle: strings('profil_screen.cancel')
};

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../images/ic_tag_faces.png'),
            errorMessage: null,
            isLoading: false,
        }
    }

    //*
    // If iPhone used is iPhoneX display top component as normal view
    // If iPhone used is not iPhoneX, displays top component as LinearGradient
    //*
    _displayTopComponent() {
        const iPhoneX = isIphoneX() ? true : false
        // If iPhone used is iPhoneX
        if (iPhoneX) {
            return (
                <View style={[styles.header_container, { backgroundColor: '#07416b' }]}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            style={{ padding: 20, }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View
                        style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                    >
                        <Text style={styles.title}>{strings('profil_screen.profil')}</Text>
                    </View>
                    <View
                        style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                    />
                </View>
            )
        } else {
            // If iPhone used is not iPhoneX
            return (
                <LinearGradient
                    style={styles.header_container}
                    colors={['#07416b', '#88b097', '#88b097', '#07416b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            //style={{ padding: 20 }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View
                        style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                    >
                        <Text style={styles.title}>{strings('profil_screen.profil')}</Text>
                    </View>
                    <View
                        style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                    />
                </LinearGradient>
            )
        }
    }
    _renderImage = () => {
        const uri = this.props.currentUser.userProfilPicture
        if (this.state.isLoading === true) {
            return (
                <ActivityIndicator
                    size='large'
                    style={styles.avatar_image}
                />
            )
        } else if (this.props.currentUser.userProfilPicture == null || this.props.currentUser.userProfilPicture == undefined) {
            return (
                <TouchableOpacity
                    onPress={() => this._openImagePicker()}
                >
                    <Image
                        style={styles.avatar_image}
                        source={this.state.defaultPicture}
                    />
                </TouchableOpacity>

            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this._openImagePicker()}
                >
                    <ImageCacheProvider
                        ImageCacheManagerOptions={{ ttl: 100 }}>
                        <CachedImage
                            style={styles.avatar_image}
                            source={{ uri: uri }}
                        />
                    </ImageCacheProvider>
                </TouchableOpacity>

            )
        }
    }

    _openImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return
            } else if (response.error) {
                this.setState({ errorMessage: response.error })
                return
            } else {
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
        this.setState({ isLoading: false })
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#07416b' }}>
                <View
                    style={{ flex: 1, backgroundColor: 'white' }}
                >
                    {this._displayTopComponent()}
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        <KeyboardAvoidingView
                            behavior='position'
                            keyboardVerticalOffset={-96}
                        >
                            <View style={styles.avatar_container}>
                                {this._renderImage()}
                                {this.state.errorMessage &&
                                    <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                                        {strings('profil_screen.change_profil_image.error')} : {this.state.errorMessage}
                                    </Text>}
                                <Text style={styles.username}>
                                    {this.props.currentUser.name}
                                </Text>
                                <Text style={{ marginTop: 20, fontStyle: 'italic' }}>{this.props.currentUser.email}</Text>
                            </View>
                            <View style={styles.profil_item_containers}>
                                <MailAdressBlock />
                                <PasswordBlock />
                                <ChangeProfilImageBlock />
                                <DeleteAccountBlock />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(ProfilScreen)