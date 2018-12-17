// Style - MessagesList

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = (itemWidth / 1.60);

const styles = StyleSheet.create({
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
    },
    text_input: {
        flex: 1,
        marginLeft: 7,
        marginRight: 7,
        paddingLeft: 5,
        //paddingBottom: 0,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
    },
    main_container: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        margin: 5
    }
})


export default styles