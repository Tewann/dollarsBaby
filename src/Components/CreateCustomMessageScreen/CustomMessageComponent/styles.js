// Style - CustomMessageComponent

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        borderTopWidth: 1,
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    subs_containers: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    sub_container: {

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 17
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
    }
})

export default styles