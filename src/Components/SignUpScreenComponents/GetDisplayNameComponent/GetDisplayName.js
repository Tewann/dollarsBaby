// src/Components/SignUpScreenComponents/GetDisplayNameComponent/GetDisplayName.js
// Get display name screen

import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

import { Icon } from 'react-native-elements'


class GetDisplayName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null
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
                        keyboardVerticalOffset={-96}
                    >
                        <View style={styles.profil_item}>
                            <Text style={styles.indications}>Avant de continuer, vous devez indiquer votre nom d'utilisateur</Text>
                            <TextInput
                                placeholder="Confirmer votre adresse mail"
                                onChangeText={(text) => this._confirmMailInputChanged(text)}
                                autoFocus={false}
                                style={styles.text_input}
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => this._deleteAccount()}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    colors={['#88b097', '#889eb0']}
                                    style={styles.button}
                                >
                                    <Icon
                                        name='delete-forever'
                                        color='white'
                                    />
                                    <Text style={styles.button_text}>Enregistrer</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profil_item}>
                            <Text style={styles.indications}>Vous pouvez ajouter une photo</Text>
                            <TextInput
                                placeholder="Confirmer votre adresse mail"
                                onChangeText={(text) => this._confirmMailInputChanged(text)}
                                autoFocus={false}
                                style={styles.text_input}
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => this._deleteAccount()}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    colors={['#88b097', '#889eb0']}
                                    style={styles.button}
                                >
                                    <Icon
                                        name='delete-forever'
                                        color='white'
                                    />
                                    <Text style={styles.button_text}>Charger une photo de profil</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profil_item_containers}>
                        <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => this._deleteAccount()}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    colors={['#88b097', '#889eb0']}
                                    style={styles.button}
                                >
                                    <Icon
                                        name='delete-forever'
                                        color='white'
                                    />
                                    <Text style={styles.button_text}>Continuer</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

export default GetDisplayName