// Style for ContactItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = itemWidth / 1.60;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        minWidth: itemWidth,
        maxWidth: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contact_text: {
        color: 'black',
        fontWeight: 'bold',
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
        marginBottom: 5,
    }
})

export default styles