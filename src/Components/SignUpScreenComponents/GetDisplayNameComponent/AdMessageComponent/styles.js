// style for Ad message screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 100);

const styles = StyleSheet.create({
    main_container: {
        alignItems: 'center'
    },
    title: {
        marginTop: 50,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    text_container: {
        width: itemWidth,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'justify',
        marginBottom: 10
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
})

export default styles