// src/Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName.js
// Get display name screen

import React from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import AccountNameComponent from './AccountNameComponent/AccountName'
import ProfilPhotoComponent from './ProfilPhotoComponent/ProfilPhoto'
import AdMessageComponent from './AdMessageComponent/AdMessage'

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
        this.setState({ display: 'AdMessage'})
    }
    _goToMainScreen = () => {
        this.props.navigation.navigate('DrawerStack')
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
                <AdMessageComponent goToMainScreen={this._goToMainScreen}/>
            )
        }
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
                    <Text style={styles.title}>BIENVENUE</Text>
                </LinearGradient>
                <ScrollView
                    keyboardShouldPersistTaps='always'
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