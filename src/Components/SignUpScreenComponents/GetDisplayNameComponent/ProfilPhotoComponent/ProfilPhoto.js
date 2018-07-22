// Component for GetDisplayName
// Grab profil picture and uploads it on firebase

import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

class ProfilPhoto extends React.Component {
    render() {
        return (
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
            </View>
        )
    }
}

export default ProfilPhoto