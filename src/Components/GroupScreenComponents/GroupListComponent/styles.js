// style for GroupList Component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);
const itemHeight = height / 20

// need to test on android with 150%

const styles = StyleSheet.create({
    top_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 4,
        paddingLeft: 2,
        backgroundColor: 'lightgrey'
    },
    list_empty: {
        textAlign: 'center',
        color: 'grey',
        //fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 80
    },
    button_container: {
        margin: 10,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
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
    modal: {
        width: 125
    },
    touchable_container: {
        margin: 2,
        borderRadius: 75,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        padding: 4,
        backgroundColor: 'lightgrey', 
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default styles