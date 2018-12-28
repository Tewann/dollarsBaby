// Style for Navigations custom components

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    CustomDrawerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
        //borderBottomWidth: 2,
        borderColor: 'white'
    },
    CustomDrawerItemContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    CustomDrawerIcon: {
        marginLeft: 5
    },
    CustomDrawerText: {
        color: 'white', 
        paddingLeft: 10, 
        fontSize: 15, 
        fontWeight: 'bold',
        paddingTop: 1
    },
    CustomNavigationHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    CustomNavigationHeaderText: {
        color: 'white', 
        flex: 10, 
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20
    }
})

export default styles