// src/Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName.js
// Get display name screen

import React from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
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

    _displayTopComponent() {
        return (
            <SafeAreaView>
                <View style={styles.header_container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>{strings('sign_up_screen.get_display_name.welcome')}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
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
                style={{ flex: 1, backgroundColor: '#63869f' }}
            >
                {this._displayTopComponent()}
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                        style={{ flex: 1, backgroundColor: 'white'}}
                    >
                        <KeyboardAvoidingView
                            behavior='position'
                            keyboardVerticalOffset={-64}
                            style={{ flex: 1}}
                        >
                            {this.AccountNameAndProfilPhotoDisplay()}
                        </KeyboardAvoidingView>
                    </ScrollView>
            </View>
        )
    }
}

export default GetDisplayName