// Style - MessageComponents

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
        padding: 5,
        fontSize: 10
    },
    main_date_container: {
        flexDirection: 'row',
        flex: 1
    },
    sub_container: {
        flex: 1,
    },
    border_top_lign_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flex: 0.5,
    },
    top_lign_container: {
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        flex: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    bottom_lign_container: {
        flex: 1,
    },
    date: {
        flexWrap: 'nowrap',
        textAlign: 'center',
        fontStyle: 'italic',
        //color: '#b3b3b3',
        paddingTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: 10
    },
    image_container: {
        justifyContent: 'flex-end',
        width: roundWidth
    },
    rounds: {
        width: roundWidth,
        height: roundWidth,
        borderRadius: roundWidth / 2,
    },
    rounds_empty: {
        minWidth: roundWidth,
        height: roundWidth,
        backgroundColor: 'red'
    },
    image: {
        width: 150,
        height: 150
    },
    received_container: {
        //alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        //backgroundColor: 'rgba(217, 217, 217, 0.7)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        maxWidth: width / 1.7,
        // minHeight: roundWidth
    },
    predefined_message: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    },
    additional_message: {
        textAlign: 'left',
        fontSize: 15,
    },
    renderMessage_send_main_container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    send_container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(179, 255, 179, 0.7)',
        borderRadius: 8,
        maxWidth: width / 1.7,
    },
    sender_name: {
        fontWeight: 'bold',
        color: '#88b0e8'
    }
})

export default styles