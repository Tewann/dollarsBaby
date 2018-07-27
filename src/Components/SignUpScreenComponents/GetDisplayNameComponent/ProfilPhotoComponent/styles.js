// Style for Profil photo component

import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
title: {
        marginTop: 50,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    avatar_container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar_image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    profil_item: {
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 35,
        borderRadius: 75
    },
    button_text: {
        color: 'white',
        marginLeft: 10,
    },
    default_button: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic'
    }
})

export default styles