// Style - Add Contact Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    header_subcontainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    list_title: {
        color: 'black',
        marginBottom: 10,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 10,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text_input: {
        paddingLeft: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },
    flatlist_container: {
    },
    footerComponent: {
        alignItems: 'center',
        marginTop: 20,
    },
    button_container: {
        backgroundColor: 'rgba(179, 255, 217, 0.5)',
        borderRadius: 10,
        padding: 5,
        marginLeft: 40,
        marginRight: 40
    },
    text_information: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})

export default styles