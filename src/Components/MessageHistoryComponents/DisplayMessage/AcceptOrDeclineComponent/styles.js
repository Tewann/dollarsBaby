// style for AcceptOrDecline buttons

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button_container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    button_text: {
        textAlign: 'center'
    },
    middle_bar: {
        borderRightWidth: 1
    }

})

export default styles