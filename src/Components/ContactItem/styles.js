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
        backgroundColor: '#CBCBCB',
        borderRadius: itemWidth/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contact_text: {


    }
})

export default styles