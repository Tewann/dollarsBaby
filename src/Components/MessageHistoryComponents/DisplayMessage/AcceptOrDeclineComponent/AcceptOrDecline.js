// message display component
// when contact request message display accept or decline button

import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'

class AcceptOrDecline extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity >
                    <Text>
                        Accepter
                    </Text>
                </TouchableOpacity>
                <View style={styles.middle_bar}/>
                <TouchableOpacity>
                    <Text>
                        Refuser
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AcceptOrDecline