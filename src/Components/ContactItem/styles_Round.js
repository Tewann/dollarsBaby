//Style for ContactItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        height: 75,
        minWidth: itemWidth,
        maxWidth: itemWidth,

        justifyContent: 'center',
        alignItems: 'center'
    },
    sub_container: {
        backgroundColor: '#CBCBCB',
        height: 75,
        width: 75,
        borderRadius: 75/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contact_text: {

    }
})

export default styles