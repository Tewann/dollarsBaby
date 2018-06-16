//Style for ContactsScreen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 2);


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'white'
    },
    modal_container: {
        alignItems: 'center',
    }
})

export default styles