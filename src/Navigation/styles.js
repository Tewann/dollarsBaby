// Style for Navigations custom components

import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const itemHeight = height / 8;

const styles = StyleSheet.create({
    CustomDrawerLinearGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: itemHeight,
        borderBottomWidth: 1,
        borderColor: '#07416b'
    },  
    CustomDrawerTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: 'white'
    },
    CustomDrawerItemContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    CustomDrawerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CustomDrawerText: {
        color: 'black',
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 1,
        flex: 3,
        textAlign: 'left',
    },
    CustomNavigationHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10
    },
    CustomNavigationHeaderContainerForIos: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
       // backgroundColor: '#63869f'
    },
    CustomNavigationHeaderText: {
        color: 'white',
        //flex: 10,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20
    }
})

export default styles