// Component for explaining ads to user

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import { strings } from '../../../../i18n'

class AdMessage extends React.Component {
    _goToNextScreen = () => {
        this.props.goToMainScreen()
    }
    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>{strings('sign_up_screen.get_display_name.ad_message.publicity')}</Text>
                <View style={styles.text_container}>
                    <Text style={styles.text}>{strings('sign_up_screen.get_display_name.ad_message.publicity_message_1')}</Text>
                    <Text style={styles.text}>{strings('sign_up_screen.get_display_name.ad_message.publicity_message_2')}</Text>
                    <Text style={styles.text}>{strings('sign_up_screen.get_display_name.ad_message.publicity_message_3')}</Text>
                    <Text style={styles.text}>{strings('sign_up_screen.get_display_name.ad_message.publicity_message_4')}</Text>
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
                        <Text style={[styles.button_text, { paddingRight: 5 }]}>{strings('sign_up_screen.get_display_name.ad_message.continue')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AdMessage