//Style for HeaderGroupContactList

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width / 8);
const roundWidth = itemWidth / 1.60;

const styles = StyleSheet.create({
    main_container: {
        //flex: 1,
        //margin: 5,
        minWidth: itemWidth,
        maxWidth: itemWidth,
        minHeight: itemWidth,
        maxHeight: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'transparent',
        fontWeight: 'bold',
    },
    modal_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist_container: {
        backgroundColor: '#ECEAEA',
        height: height / 1.75,
        width: itemWidth * 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgrey'
    }
})

export default styles