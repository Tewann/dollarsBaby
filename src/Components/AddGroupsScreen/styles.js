// Style - Add Groups Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
 /*        borderBottomWidth: 1,
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
        textAlign: 'center'
    },
    list_empty: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20,
        paddingTop: 80
    },
    button_container: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        minWidth: width / 2.5,
        backgroundColor: '#517fa4'
    },
    group_title_container: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupTypeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    text_input: {
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
        minHeight: 40
    },
    create_button: {
        maxWidth: width / 3,
        backgroundColor: '#517fa4'
    }
})

export default styles