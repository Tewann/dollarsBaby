// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
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

class ProfilScreen extends React.Component {
    //*
    // If iPhone used is iPhoneX display top component as normal view
    // If iPhone used is not iPhoneX, displays top component as LinearGradient
    //*
    _displayTopComponent() {
        const iPhoneX = isIphoneX() ? true : false
        // If iPhone used is iPhoneX
        if (iPhoneX) {
            return (
                <View style={[styles.header_container, { backgroundColor: '#3a485c' }]}>
                    <Icon
                        name='chevron-left'
                        color='white'
                        size={35}
                        style={{ padding: 20 }}
                        underlayColor='transparent'
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    />
                    <Text style={styles.title}>{strings('profil_screen.profil')}</Text>
                    <View></View>
                </View>
            )
        } else {
            // If iPhone used is not iPhoneX
            return (
                <LinearGradient
                    style={styles.header_container}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#88b097', '#3a485c', '#3a485c',]}>
                    <Icon
                        name='chevron-left'
                        color='white'
                        size={35}
                        style={{ padding: 20 }}
                        underlayColor='transparent'
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    />
                    <Text style={styles.title}>{strings('profil_screen.profil')}</Text>
                    <View></View>
                </LinearGradient>
            )
        }
    }
    render() {
        this._displayTopComponent()
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#3a485c' }}>
                <View
                    style={{ flex: 1, backgroundColor: 'white' }}
                >
                    {this._displayTopComponent()}
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
                                    source={this.props.currentUser.userProfilPicture}
                                />
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