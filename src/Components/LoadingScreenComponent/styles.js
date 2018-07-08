// Style for Loading Screen

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40495a'
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 50,
        textShadowOffset: { width: 2, height: 2 }
      },
})

export default styles