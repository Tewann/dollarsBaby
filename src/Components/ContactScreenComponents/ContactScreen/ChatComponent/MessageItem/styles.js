//Style for MessageItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
// const itemHeight = (height / 12)
const itemHeight = (height / 24)

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 2,
        height: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,

    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default styles