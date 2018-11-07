//Style for HeaderContactList

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);
const itemHeight = height / 20

// need to test on android with 150%

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'lightgrey',
    },
    add_contact_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 4,
        marginLeft: 2,
    },
    text_input: {
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5,
        width: itemWidth,
        backgroundColor: '#f2f2f2',
        color: 'lightgrey',
        borderRadius: 10,
        height: itemHeight,
        flex: 10
    },
    cross: {
        flex: 1,
        paddingRight: 5
    },
})

export default styles