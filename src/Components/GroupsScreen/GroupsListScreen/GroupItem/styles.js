// Style for GroupItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = (itemWidth / 1.60);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        minWidth: itemWidth,
        maxWidth: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_container: {
        flexDirection: 'column'
    },
    type_text: {
        color: 'black',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    contact_text: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    unread_messages_container: {
        position: 'absolute',
        right: 10,
        top: 0,
        zIndex: 1,
        backgroundColor: '#63869f',
        width: roundWidth / 4,
        height: roundWidth / 4,
        borderRadius: roundWidth / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unread_messages_number: {
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 1
    }
})

export default styles