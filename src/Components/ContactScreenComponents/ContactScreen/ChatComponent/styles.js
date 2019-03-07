// Style - Chat component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
// const itemHeight = (height / 12)
const itemHeight1 = (height / 22)
const itemHeight2 = (height / 16)

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
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: itemHeight1
    },
    TextInput_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
        marginTop: 5
    },
    send_icon_container: {
        paddingRight: 7,
        paddingLeft: 7,
        height: 40,
        justifyContent: 'center'
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 12
    },
    image_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    complements_title: {
        height: itemHeight2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main_container_for_complements: {
        flex: 1,
        margin: 2,
        height: itemHeight2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#07416b' 
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})


export default styles