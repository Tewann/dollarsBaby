//Style for ContactItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = itemWidth / 1.60;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        //height: 75,
        minWidth: itemWidth,
        maxWidth: itemWidth,
        //backgroundColor: '#889eb0',
        //borderRadius: itemWidth/2,
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
        backgroundColor: '#889eb0',
        marginBottom: 5,
    }
})

export default styles