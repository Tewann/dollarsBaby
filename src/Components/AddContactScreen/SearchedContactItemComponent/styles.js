// Style - Searched Contact Item

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemHeight = height / 10;
const itemWidth = (width / 3.5) - 10;
const roundWidth = itemWidth / 2;

const styles = StyleSheet.create({
    defaultContainer: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        minHeight: itemHeight,
        flexDirection: 'row',
        paddingLeft: 15
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: 15
    },
    confirmationContainer: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        minHeight: itemHeight,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#EEE3E3'
    },
    contactRequestSended: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: itemHeight,
        paddingTop: 10,
        paddingBottom: 10,
    }
})

export default styles