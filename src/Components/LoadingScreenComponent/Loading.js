// src/Components/LoadingScreenComponents/Loading.js
// Loading Screen

import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'

class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'MainStackNavigator' : 'SignUp')
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

export default Loading