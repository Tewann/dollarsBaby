/**
 * Contact Screen component
 * Display the contact information, last messages and the ability to send messages
 */

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import ChatComponent from './ChatComponent/ChatComponent'
import OptionsComponent from './OptionsComponent/OptionsComponent'

class ContactScreen extends React.Component {

    // Before component mount, set screen on conversation
    componentWillMount = () => {
        /* const action = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'conversation' }
        this.props.dispatch(action) */
        const hideAdsAction = { type: 'AD_BANNER', value: { value: false, event: 'screen' } }
        this.props.dispatch(hideAdsAction)
    }

    componentWillUnmount = () => {
        const displaysAdsAction = { type: 'AD_BANNER', value: { value: true, event: null } }
        this.props.dispatch(displaysAdsAction)
    }
    _displayContactsList = () => {
        this.props.navigation.navigate('Mainscreen')
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                {this.props.currentDisplayedContactScreen == 'conversation' &&
                    <ChatComponent displayContactsList={() => this._displayContactsList()} />
                }
                {this.props.currentDisplayedContactScreen == 'options' &&
                    <OptionsComponent />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentDisplayedContactScreen: state.contactManagment.currentDisplayedContactScreen
    }
}

export default connect(mapStateToProps)(ContactScreen)

