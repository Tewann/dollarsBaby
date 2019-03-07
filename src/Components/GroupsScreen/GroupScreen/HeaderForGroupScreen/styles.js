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
        flex: 1,
        backgroundColor: 'red'
    },
    back_to_contacts: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    retour: {
        marginLeft: 0,
        color: '#07416b'
    },
    picture_and_name_container: {
        flexDirection: 'row',
        alignItems: 'center',
        
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
        paddingLeft: 10,
        //paddingRight: 10,
        color: 'white'
    },
    group_name_creator: {
        fontStyle: 'italic',
        paddingLeft: 10,
        fontSize: 15,
        color: 'white'
    },
})

export default styles