//Style for DisplayMessage (Message History Item)

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3) - 10;
const roundWidth = itemWidth / 2.75;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginLeft: 10,
        paddingLeft: 5,
        marginRight: 10,
        paddingBottom: 1,
        marginTop: 5,

    },
    function_container: {
        flexDirection: 'row'
    },
    messages_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        flex: 2,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    send_messages_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10,
        flex: 2,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    predefined_message_and_arrow_container: {
        flexDirection: 'row'
    },
    send_predefined_message_and_arrow_container: {
        flexDirection: 'row-reverse'
    },
    contact_name: {
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'lightgrey',
        textShadowOffset: { width: -1, height: 1 },
        textAlign: 'center', 
        marginLeft: 5
    },
    send_contact_name: {
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'lightgrey',
        textShadowOffset: { width: -1, height: 1 },
        textAlign: 'center', 
        marginRight: 5
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
        marginBottom: 5,
    },
    predefined_message: {
        paddingLeft: 5,
        //fontWeight: 'bold'
    },
    additionnal_message: {
        fontStyle: 'italic',
        paddingLeft: 5
    },
    time: {
        //borderBottomWidth: 1,
        //borderColor: 'lightgrey',
        //justifyContent: 'center',
        paddingTop: 3
    }
})

export default styles