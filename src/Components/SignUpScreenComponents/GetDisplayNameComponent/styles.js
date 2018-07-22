// Style for Profil Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    sub_container: {
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    indications: {
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tooltips: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 10,
    },
    profil_item_containers: {
        marginTop: 40
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
        marginTop: 10,
        borderRadius: 75
    },
    button_text: {
        color: 'white',
        marginLeft: 10,
    },
})

export default styles