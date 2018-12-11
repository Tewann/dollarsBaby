// Style for Section Header Component

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
    },
    sub_container: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    top_lign_container: {
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        flex: 1
    },
    bottom_lign_container: {
        flex: 1,
    },
    date: {
        flexWrap: 'nowrap',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#b3b3b3',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    }
})

export default styles