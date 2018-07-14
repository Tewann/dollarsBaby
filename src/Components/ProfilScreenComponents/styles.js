// Style for Profil Screen

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    avatar_container:{
        alignItems: 'center',
        paddingTop: 30,
    },
    avatar_image: {
        width: 150,
        height: 150,
        borderRadius: 75,

    },
    username: {
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    },
    profil_item_containers: {
        marginTop: 40
    },
    profil_item: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
})

export default styles