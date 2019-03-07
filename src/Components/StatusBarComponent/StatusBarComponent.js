/**
 * Component called from App.js =>  can listen to redux store and adapts the status bar color depending on the screen displayed
 */

import React from 'react';
import { StatusBar, /* Platform,  View*/ } from 'react-native'
//import {getStatusBarHeight} from './StatusBarSizeIOS'

//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;
//const STATUSBAR_HEIGHT = getStatusBarHeight();

class StatusBarComponent extends React.Component {
    /* constructor(props) {
        super(props)
        barStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'
    } */
    render() {
        return (
           /*  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor:"#88b097" }}> */
                <StatusBar /* translucent */ backgroundColor="#88b097" /* barStyle={this.barStyle} */ />
            /* </View> */
        );
    }
}

export default StatusBarComponent