// Style - MessageListScreen

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = (itemWidth / 1.60);

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
        flex: 1,
        marginLeft: 7,
        marginRight: 7,
        //borderBottomWidth: 1,
        paddingLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
    },
    username: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatar_container: {
        alignItems: 'center',
        paddingTop: 30,
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    TextInput_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    additionnal_message_length: {
        marginLeft: 7,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        textAlign: 'center',
        color: 'white'
    }
})


export default styles