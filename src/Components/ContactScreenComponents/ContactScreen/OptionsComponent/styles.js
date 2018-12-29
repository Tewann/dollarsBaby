// Style for Profil Screen

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    profil_item_containers: {
        marginTop: 40
    },
    profil_item: {
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    nickname: {
        fontWeight: 'bold',
        paddingLeft: 2
    },
    text_input: {
        flex: 1,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#cecfcf',
        borderRadius: 5,
        marginBottom: 5,
    },
    input_container: {
        flexDirection: 'row',
    },
    icon_container: {
        paddingLeft: 5,
        justifyContent: 'center'
    }
})

export default styles