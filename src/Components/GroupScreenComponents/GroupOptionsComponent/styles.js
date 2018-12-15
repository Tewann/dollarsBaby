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
    back_to_contacts: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    retour: {
        marginLeft: 0,
        color: '#889eb0'
    },
    avatar_container: {
        alignItems: 'center',
        paddingTop: 30,
    },
    group_name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    group_name_creator: {
        fontStyle: 'italic'
    },
    contacts_flatlist: {
        paddingTop: 10,
        marginBottom: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    message_flatlist: {
        marginTop: 10,
        flex: 1,
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
})


export default styles