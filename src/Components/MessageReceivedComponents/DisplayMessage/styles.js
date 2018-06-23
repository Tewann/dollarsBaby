//Style for Message Received Item

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        borderBottomWidth: 1,
        marginLeft: 10,
        paddingLeft: 5,
        marginRight: 10,
        marginTop: 5,
    },
    contact_name: {
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'red',
        textShadowOffset: { width: -1, height: 1 },
    },
    predefined_message: {
        paddingLeft: 5
    },
    additionnal_message: {
        fontStyle: 'italic',
        paddingLeft: 5
    }
})

export default styles