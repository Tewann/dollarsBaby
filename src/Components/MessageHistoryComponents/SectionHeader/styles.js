// Style for Section Header Component

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        flex: 1
    },
    sub_container: {
        flex: 1,
    },
    border_top_lign_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flex: 0.5,
    },
    top_lign_container: {
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        flex: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    bottom_lign_container: {
        flex: 1,
    },
    date: {
        flexWrap: 'nowrap',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#b3b3b3',
        paddingTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
})

export default styles