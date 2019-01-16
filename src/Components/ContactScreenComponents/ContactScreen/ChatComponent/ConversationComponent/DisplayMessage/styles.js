//Style for DisplayMessage (Message History Item)

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'


const { height, width } = Dimensions.get('window');
const itemWidth = (width / 3.5) - 10;
const roundWidth = itemWidth / 2.75;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingLeft: 10,
        marginRight: 10,
        paddingBottom: 1,
        marginTop: 5,
        //marginBottom: 5
    },
    renderMessage_main_container: {
        flexDirection: 'row',
        flex: 1
    },
    name_and_time: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 3
    },
    contact_name: {
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'lightgrey',
        textShadowOffset: { width: -1, height: 1 },
    },
    time_container: {
        justifyContent: 'flex-end',
    },
    time: {
        paddingBottom: 2,
        padding: 5
    },
    image_container: {
        justifyContent: 'flex-end',
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    both_messages_container: {
        //alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        //backgroundColor: 'rgba(217, 217, 217, 0.7)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        maxWidth: width / 1.7,
    },
    predefined_message: {
        fontWeight: 'bold',
        textAlign: 'left'
    },
    additional_message: {
        textAlign: 'left'
    },
    renderMessage_send_main_container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    send_both_messages_container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: 'rgba(179, 255, 179, 0.7)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        maxWidth: width / 1.7
    },
})

export default styles