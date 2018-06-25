// Style for GroupScreenComponent

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    top_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 8,
        marginLeft: 2,
    },
    text_input: {
        marginLeft: 5,
        marginRight: 5,
        borderBottomWidth: 1,
        paddingLeft: 5,
        width: itemWidth,
    },
    cross: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
        marginRight: 5,
        height: 22,
        width: 22,
        borderRadius: 22 / 2,
        backgroundColor: '#889eb0'
    },
    crossUp: {
        backgroundColor: 'white',
        height: 16,
        width: 2
    },
    crossFlat: {
        backgroundColor: 'white',
        height: 2,
        width: 16,
        position: 'absolute',
        left: 3,
        top: 10
    }
})

export default styles