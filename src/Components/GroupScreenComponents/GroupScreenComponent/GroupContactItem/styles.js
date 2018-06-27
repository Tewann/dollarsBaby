// Style for GroupContactItem

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 6);
const roundWidth = itemWidth / 1.60;

const styles = StyleSheet.create({
    main_container: {
        //flex: 1,
       // margin: 5,
        minWidth: itemWidth,
        maxWidth: itemWidth,
        minHeight: itemWidth,
        maxHeight: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
      },
    contact_text: {
        color: 'black',
        fontWeight: 'bold',
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
        backgroundColor: '#889eb0',
        marginBottom: 5,
    }
})

export default styles