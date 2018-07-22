// Style for Profil Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
title: {
        marginTop: 50,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    tooltips: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 10,
    },
    profil_item: {
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    text_input: {
        width: itemWidth,
        borderWidth: 1,
        borderColor: '#cecfcf',
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        borderRadius: 75
    },
    button_text: {
        color: 'white',
        marginLeft: 10,
    },
})

export default styles