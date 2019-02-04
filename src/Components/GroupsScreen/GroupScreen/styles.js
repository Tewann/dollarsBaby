//Style for Group Options Component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = (itemWidth / 1.60);


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
})


export default styles