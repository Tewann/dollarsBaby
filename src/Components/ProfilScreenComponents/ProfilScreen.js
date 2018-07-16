// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import MailAdressBlock from './MailAdressBlockComponent/MailAdressBlock'
import PasswordBlock from './PasswordBlockComponent/PasswordBlock'
import ChangeProfilImageBlock from './ChangeProfilImageBlockComponent/ChangeProfilImageBlock.js'
import DeleteAccountBlock from './DeleteAccountBlockComponent/DeleteAccountBlock'
import firebase from 'react-native-firebase'

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: require('../../../images/ic_tag_faces.png'),
            email: firebase.auth().currentUser.email
        }
    }

    // function passed to image picker block
    // get avatar.uri and modify profil state
    _updateAvatar = (requireSource) => {
        this.setState({
            avatar: requireSource
        })
    }

    _updateMail = () => {
        const email = firebase.auth().currentUser.email
        this.setState({ email: email })
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
                        </View>
                        <View style={styles.profil_item_containers}>
                            <MailAdressBlock updateMail={() => this._updateMail()} />
                            <PasswordBlock />
                            <ChangeProfilImageBlock updateAvatar={(requireSource) => this._updateAvatar(requireSource)} />
                            <DeleteAccountBlock />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

export default ProfilScreen