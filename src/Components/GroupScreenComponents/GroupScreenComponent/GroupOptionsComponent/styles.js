//Style for Group Options Component

import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    messagelist_main_container: {
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
    flatlist: {
        marginTop: 10,
        flex: 1,
    },
    text_input: {
        marginLeft: 7,
        marginRight: 7,
        borderBottomWidth: 1,
        paddingLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        height: 40
    },
})


export default styles