// Style - Options Screen

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        /* borderBottomWidth: 1,
        borderColor: '#07416b' */
    },
    header_subcontainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        /* borderTopWidth: 1,
        borderTopColor: '#cecfcf', */
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    itemTitle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default styles