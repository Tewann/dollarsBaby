//Components/DisplayMessage/DisplayMessage.js
//Component : display each iteration of messages received

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

class DisplayMessage extends React.Component{
    render() {
        const { message } = this.props
        return (
            <View>
                <Text>
                    {message.message}
                </Text>
            </View>
        )
    }
}

export default DisplayMessage