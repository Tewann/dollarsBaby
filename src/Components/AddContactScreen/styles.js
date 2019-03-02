// Style - Add Contact Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#07416b'
    },
    header_subcontainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    text_input: {
        paddingLeft: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        minHeight: 40
    },
    list_empty: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20,
        paddingTop: 80
    },
})

export default styles