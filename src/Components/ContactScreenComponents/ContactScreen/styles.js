// Style - MessageListScreen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const styles = StyleSheet.create({
    messagelist_main_container: {
        flex: 1,
    },
    flatlist: {
        marginTop: 10,
        flex: 1,
    },
    text_input: {
        flex: 1,
        marginLeft: 7,
        marginRight: 7,
        //borderBottomWidth: 1,
        paddingLeft: 5,
        //paddingBottom: 0,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
    },
    TextInput_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    additionnal_message_length: {
        marginLeft: 7,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        textAlign: 'center',
        color: 'white'
    }
})


export default styles