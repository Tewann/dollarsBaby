// src/Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName.js
// Get display name screen

import React from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import AccountNameComponent from './AccountNameComponent/AccountName'
import ProfilPhotoComponent from './ProfilPhotoComponent/ProfilPhoto'
import AdMessageComponent from './AdMessageComponent/AdMessage'
import { strings } from '../../../i18n'

import { Icon } from 'react-native-elements'


class GetDisplayName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            display: 'AccountName'
        }
    }

    _goToProfilPictureComponent = () => {
        this.setState({ display: 'ProfilPhoto' })
    }
    _goToLoginScreen = () => {
        this.props.navigation.navigate('Login')
    }
    _goToAdMessageComponent = () => {
        this.setState({ display: 'AdMessage' })
    }
    _goToMainScreen = () => {
        this.props.navigation.navigate('Loading')
    }


    AccountNameAndProfilPhotoDisplay() {
        if (this.state.display === 'AccountName') {
            return (
                <AccountNameComponent
                    goToLogin={this._goToLoginScreen}
                    goToProfilPicture={this._goToProfilPictureComponent}
                />
            )
        } else if (this.state.display === 'ProfilPhoto') {
            return (
                <ProfilPhotoComponent
                    goToAdMessage={this._goToAdMessageComponent}
                />
            )
        } else if (this.state.display === 'AdMessage') {
            return (
                <AdMessageComponent goToMainScreen={this._goToMainScreen} />
            )
        }
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <LinearGradient
                    style={styles.header_container}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    colors={['#88b097', '#07416b', '#07416b',]}>
                    <Text style={styles.title}>{strings('sign_up_screen.get_display_name.welcome')}</Text>
                </LinearGradient>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                >
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={-64}
                    >

                        {this.AccountNameAndProfilPhotoDisplay()}


                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

export default GetDisplayName