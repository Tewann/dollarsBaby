// Style for Profil Screen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 35);

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        /* borderBottomWidth: 1,
        borderColor: '#07416b' */
    },
    header_subcontainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatar_container: {
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
        borderTopWidth: 1,
        borderTopColor: '#cecfcf',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
})

export default styles