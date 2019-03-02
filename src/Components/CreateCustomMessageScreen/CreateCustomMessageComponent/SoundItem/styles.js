// Style - SoundItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window')
 //const itemHeight = (height / 16)
const itemHeight = (height / 22)

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        margin: 2,
        minHeight: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 2,
        paddingBottom: 2
    }
})

export default styles