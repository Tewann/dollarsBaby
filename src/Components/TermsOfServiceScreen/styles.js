// Style - Terms Of Service Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const relativePadding = width / 8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    topText: {
        paddingTop: 15,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    declineMessage: {
        marginLeft: 5,
        color: 'red',
    },
    scrollView: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    TOS: {
        padding: 10,
        textAlign: 'justify'
    },
    bottomContainer: {

    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 5
    },
    button: {
        paddingRight: relativePadding,
        paddingLeft: relativePadding

    },
  })

export default styles