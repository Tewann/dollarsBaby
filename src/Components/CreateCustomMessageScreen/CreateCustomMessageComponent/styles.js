// Style - Create Custom Message Component

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
    main_container: {
        borderBottomWidth: 5,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        paddingTop: 15,
        paddingBottom: 5
        //marginTop: 10
    },
    add_predefined_message: {
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    textInput: {
        marginTop: 10,
        width: width - 30,
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
    },
    buttons_container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -15,
        paddingTop: -15
    },
    add_sound_title_container: {
        //flex: 1,
        justifyContent: 'center',
    },
    add_sound: {
        //flex: 1,
    },
    flatlists_container: {
        //flex: 2,
    },
    flatlist: {
        //flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
})

export default styles