//Style for HeaderContactList

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    add_contact_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 8,
        marginLeft: 2,
    },
    text_input: {
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5,
        width: itemWidth,
        backgroundColor: '#f2f2f2',
        color: 'white',
        borderRadius: 10,

    },
    cross: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
        marginRight: 5,
        height: 22,
        width: 22,
        borderRadius: 22 / 2,
        backgroundColor: 'lightgrey'
    },
    crossUp: {
        backgroundColor: 'white',
        height: 16,
        width: 2
    },
    crossFlat: {
        backgroundColor: 'white',
        height: 2,
        width: 16,
        position: 'absolute',
        left: 3,
        top: 10
    }


})

export default styles