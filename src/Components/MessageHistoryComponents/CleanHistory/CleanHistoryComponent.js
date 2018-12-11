// Component top of message history screen
// Displays trash button to delete all message in history

import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'

class CleanHistoryComponent extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => console.log('button press')}
            >
                <Icon
                    name='trash'
                    type='evilicon'
                    color='#517fa4'
                    size={40}
                />
            </TouchableOpacity>
        )
    }
}

export default CleanHistoryComponent