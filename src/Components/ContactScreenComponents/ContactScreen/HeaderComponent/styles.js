// Style - HeaderComponent

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3.5) - 10;
const roundWidth = itemWidth / 2.75;

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    back_to_contacts: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    retour: {
        marginLeft: 0,
        color: '#889eb0'
    },
    picture_and_name_container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2
    },
    avatar_container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
        padding: 10,

    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default styles