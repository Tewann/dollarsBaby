//Style for MessageItem

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        minHeight: 75,
        minWidth: 150,
        backgroundColor: '#090909',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        borderRadius: 75/1.2,
        
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
})

export default styles