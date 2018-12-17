// Style for Mail Block Component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    profil_item: {
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingTop: 15,
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
        //paddingBottom: 0,
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