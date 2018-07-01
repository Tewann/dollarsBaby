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
    cross: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 1,
        //marginRight: 5,
        height: roundWidth / 1.5,
        width: roundWidth / 1.5,
        borderRadius: roundWidth / 2,
        backgroundColor: '#889eb0',
        borderRadius: roundWidth / 2,
    },
    crossUp: {
        backgroundColor: 'white',
        height: roundWidth/2,
        width: 2
    },
    crossFlat: {
        backgroundColor: 'white',
        height: 2,
        width: roundWidth / 2 + 2,
        position: 'absolute',
        left: roundWidth / 17.3,
        top: roundWidth / 3.35
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
        backgroundColor: '#E0F4FB',
        height: height / 1.75,
        width: itemWidth * 3,
        borderWidth: 1,
        borderRadius: 5
    }
})

export default styles