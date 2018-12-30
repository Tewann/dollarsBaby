// Style - Chat component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
// const itemHeight = (height / 12)
const itemHeight = (height / 22)

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
        minHeight: itemHeight
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