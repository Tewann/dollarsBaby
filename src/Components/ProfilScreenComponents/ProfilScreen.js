// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import MailAdressBlock from './MailAdressBlockComponent/MailAdressBlock'
import PasswordBlock from './PasswordBlockComponent/PasswordBlock'
import ChangeProfilImageBlock from './ChangeProfilImageBlockComponent/ChangeProfilImageBlock.js'
import DeleteAccountBlock from './DeleteAccountBlockComponent/DeleteAccountBlock'
import firebase from 'react-native-firebase'
import { getUserDataForProfilScreen } from '../../Services/firebaseFunctions'
import { connect } from 'react-redux'

class ProfilScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            userName: "Nom d'utilisateur"
        }
    }

    componentDidMount = async () => {
        const userInformations = await getUserDataForProfilScreen()
        this.setState({ email: userInformations.userEmail })
        this.setState({ userName: userInformations.userName })
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
                                    source={this.props.currentUser.userProfilPicture}
                                />
                            <Text style={styles.username}>{this.state.userName}</Text>
                            <Text style={{ marginTop: 20, fontStyle: 'italic' }}>{this.state.email}</Text>
                        </View>
                        <View style={styles.profil_item_containers}>
                            <MailAdressBlock updateMail={() => this._updateMail()} />
                            <PasswordBlock />
                            <ChangeProfilImageBlock />
                            <DeleteAccountBlock />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations,
    }
}

export default connect(mapStateToProps)(ProfilScreen)