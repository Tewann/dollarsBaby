/**
 * Component called from App.js =>  can listen to redux store and adapts the status bar color depending on the screen displayed
 */

import React from 'react';
import { connect } from 'react-redux'
import { StatusBar, Platform } from 'react-native'

class StatusBarComponent extends React.Component {
    constructor(props) {
        super(props)
        barStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'
    }
    render() {
        return (
            <StatusBar backgroundColor="#88b097" barStyle={this.barStyle} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusBarColor: state.options.statusBarColor
    }
}

export default connect(mapStateToProps)(StatusBarComponent)