// Style for SignUp Screen

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
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50,
        textShadowOffset: { width: 2, height: 2 }
    },
    SignUpButton: {
        borderRadius: 75,
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
    },
    Text: {
        color: 'white',
        fontSize: 15
      },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 75,
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 20,
        paddingBottom: 0,
    }
})

export default styles