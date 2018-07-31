// src/Components/LoadingScreenComponents/Loading.js
// Loading Screen

import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './styles'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { fetchContacts } from '../../Services/firebaseFunctions'

class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.dispatch(fetchContacts(user.displayName))
                this.props.navigation.navigate('DrawerStack')

            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>eBlink</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

export default connect()(Loading)