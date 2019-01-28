// style for GroupList Component

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    list_empty_text1: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20,
        paddingTop: 80,
        marginBottom: 5
    },
    list_empty_text2_container: { 
        flexDirection: 'row', 
        flex: 1, 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default styles