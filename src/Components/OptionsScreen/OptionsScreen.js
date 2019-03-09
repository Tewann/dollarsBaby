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

//import LinearGradient from 'react-native-linear-gradient'

import { showContactRequests } from '../../Services/firebaseFunctions'
//import { isIphoneX } from '../../Services/is-iphone-x'

class OptionsScreen extends React.Component {
    _displayTopComponent() {
        return (
            <SafeAreaView>
                <View style={styles.header_container}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            style={{ padding: 20, }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 4, alignItems: 'center' }}>
                        <Text style={styles.title}>{strings('options.title')}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
            </SafeAreaView>
        )
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
            <View style={{ flex: 1, backgroundColor: '#63869f' }}>
                {this._displayTopComponent()}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{strings('options.hide_contact_requests')}</Text>
                        <Switch
                            style={{ marginTop: 2, marginLeft: 5 }}
                            onValueChange={(value) => this.toggleSwitch(value)}
                            value={this.props.hideContactRequests}
                        />
                    </View>
                </View>
            </View>
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