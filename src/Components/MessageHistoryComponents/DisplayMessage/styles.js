//Style for DisplayMessage (Message History Item)

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = itemWidth / 3;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        borderBottomWidth: 1,
        marginLeft: 10,
        paddingLeft: 5,
        marginRight: 10,
        paddingBottom: 1,
        marginTop: 5,
        borderColor: 'lightgrey',       
    },
    function_container: {
        flexDirection: 'row'
    },
    messages_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        flex: 2
    },
    predefined_message_and_arrow_container: {
        flexDirection: 'row'
    },
    contact_name: {
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'lightgrey',
        textShadowOffset: { width: -1, height: 1 },
        textAlign: 'center'
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
        marginBottom: 5,
    },
    predefined_message: {
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    additionnal_message: {
        fontStyle: 'italic',
        paddingLeft: 5
    },
    time: {

    }
   })

export default styles