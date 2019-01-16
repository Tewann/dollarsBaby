// Style for ForgottenPsswrd

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#40495a'
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
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    Text1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    Text2: {
        color: 'white',
        fontSize: 15,
        //fontWeight: 'bold',
        textAlign: 'center'
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
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    }
})

export default styles