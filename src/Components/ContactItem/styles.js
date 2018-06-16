//Style for ContactItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        height: 75,
        minWidth: itemWidth,
        maxWidth: itemWidth,
// BEAU BLUE        backgroundColor: '#94a9bc',
        backgroundColor: '#889eb0',
        borderRadius: itemWidth/2,
        justifyContent: 'center',
        alignItems: 'center',
        //borderColor: '#3a485c',
        //borderWidth: 2,
      },
    contact_text: {
        color: 'white',
    }
})

export default styles