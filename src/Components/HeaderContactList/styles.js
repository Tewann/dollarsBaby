//Style for HeaderContactList

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width / 2);
const buttonposition = (width / 3) - (((width / 3) / 2) + 10);

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: buttonposition,

    },
    modal_container: {
        flex: 1,

    },
    modal_composent: {
        height: 100,
        width: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modal_text: {
        color: 'black'

    },
    cross: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //minWidth: itemWidth,
        //maxWidth: itemWidth,
        //backgroundColor: '#3a485c',
        //borderRadius: itemWidth / 2,
        marginTop: 8,
        marginBottom: 1,
        height: 22,
        width: 22,
        borderRadius: 22/2,
        backgroundColor: '#889eb0'
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