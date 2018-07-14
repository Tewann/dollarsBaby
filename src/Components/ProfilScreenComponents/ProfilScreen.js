// src/Components/ProfilScreenComponents/ProfilScreen.js
// Profil screen view

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon, Avatar } from 'react-native-elements'

class ProfilScreen extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={['#3a485c', '#778ba9', '#3a485c',]}
                style={{ flex: 1 }}
            >
                <View style={styles.header_container}>
                    <Icon 
                        name='chevron-left'
                        color='white'
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    />
                    <Text style={styles.title}>PROFIL</Text>
                    <View></View>
                </View>
                
            </LinearGradient>
        )
    }
}

export default ProfilScreen