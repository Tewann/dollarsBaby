/**
* Called from the Drawer Menu
* Displays the options screen :
*  - ...
* Props : 
*  - None
*/


import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Switch } from 'react-native'
import styles from './styles'
import { strings } from '../../i18n'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient'

import { showContactRequests } from '../../Services/firebaseFunctions'
import { isIphoneX } from '../../Services/is-iphone-x'

class OptionsScreen extends React.Component {
    //*
    // If iPhone used is iPhoneX display top component as normal view
    // If iPhone used is not iPhoneX, displays top component as LinearGradient
    //*
    _displayTopComponent() {
        const iPhoneX = isIphoneX() ? true : false
        // If iPhone used is iPhoneX
        if (iPhoneX) {
            return (
                <View style={[styles.header_container, { backgroundColor: '#07416b' }]}>
                    <TouchableOpacity
                        style={[styles.header_subcontainer, { paddingLeft: 10 }]}
                        onPress={() => this._navigateToMainStackNavigator()}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            style={{ padding: 20, }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View style={[styles.header_subcontainer, { paddingLeft: 20 }]} >
                        <Text style={styles.title}>{strings('options.title')}</Text>
                    </View>
                </View>
            )
        } else {
            // If iPhone used is not iPhoneX
            return (
                <LinearGradient
                    style={styles.header_container}
                    colors={['#07416b', '#88b097', '#88b097', '#07416b']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <TouchableOpacity
                        style={[styles.header_subcontainer, { paddingLeft: 10 }]}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View style={[styles.header_subcontainer, { paddingLeft: 20 }]} >
                        <Text style={styles.title}>{strings('options.title')}</Text>
                    </View>
                </LinearGradient>
            )
        }
    }

    toggleSwitch = (value) => {
        const action = { type: 'HIDE_CONTACT_REQUESTS_SWITCH', value: value }
        this.props.dispatch(action)
        showContactRequests(this.props.currentUser, value)
            .catch(() => {
                const errValueToAction = value ? false : true
                const action = { type: 'HIDE_CONTACT_REQUESTS_SWITCH', value: errValueToAction }
                this.props.dispatch(action)
            })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#07416b' }}>
                <View
                    style={{ flex: 1, backgroundColor: 'white' }}
                >
                    {this._displayTopComponent()}
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{strings('options.hide_contact_requests')}</Text>
                        <Switch
                            style={{ marginTop: 2, marginLeft: 5 }}
                            onValueChange={(value) => this.toggleSwitch(value)}
                            value={this.props.hideContactRequests}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hideContactRequests: state.options.hideContactRequests,
        currentUser: state.getCurrentUserInformations.name,
    }
}

export default connect(mapStateToProps)(OptionsScreen)