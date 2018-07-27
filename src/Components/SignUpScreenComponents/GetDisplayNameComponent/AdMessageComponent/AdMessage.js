// Component for explaining ads to user

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

class AdMessage extends React.Component {
    _goToNextScreen = () => {
        this.props.goToMainScreen()
    }
    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>Publicités</Text>
                <View style={styles.text_container}>
                    <Text style={styles.text}>Les publicités nous permettent de financer les coûts liés à la maintenance de l'application.</Text>
                    <Text style={styles.text}>Elles nous permettent également de vous proposer l'application gratuitement.</Text>
                    <Text style={styles.text}>Nous faisons tous nous efforts pour qu'elles ne gênent pas votre utilisation.</Text>
                    <Text style={styles.text}>Nous vous remercions par avance pour votre  compréhension.</Text>
                </View>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this._goToNextScreen()}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        colors={['#88b097', '#889eb0']}
                        style={styles.button}
                    >
                        <Icon
                            name='chevron-right'
                            type='entypo'
                            color='white'
                        />
                        <Text style={[styles.button_text, { paddingRight: 5 }]}>Continuer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AdMessage