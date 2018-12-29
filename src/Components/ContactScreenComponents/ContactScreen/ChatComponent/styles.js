// Style - Chat component

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
    text_input: {
        flex: 1,
        paddingLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 40
    },
    TextInput_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
    },
    send_icon_container: {
        paddingRight: 7,
        paddingLeft: 7,
        height: 40,
        justifyContent: 'center'
    }
})


export default styles