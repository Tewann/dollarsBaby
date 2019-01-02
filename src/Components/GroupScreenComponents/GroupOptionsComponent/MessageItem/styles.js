//Style for MessageItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
const itemHeight = (height / 12)


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        height: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07416b',
        borderRadius: 12,

    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
})

export default styles