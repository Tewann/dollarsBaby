/**
 * Component called from App.js =>  can listen to redux store and adapts the status bar color depending on the screen displayed
 */

import React from 'react';
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'

class StatusBarComponent extends React.Component {
    render() {
        return (
            <StatusBar backgroundColor="#88b097" barStyle="light-content" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusBarColor: state.options.statusBarColor
    }
}

export default connect(mapStateToProps)(StatusBarComponent)