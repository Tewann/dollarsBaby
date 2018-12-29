/**
 * Contact Screen component
 * Display the contact information, last messages and the ability to send messages
 */

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import HeaderComponent from './HeaderComponent/HeaderComponent'
import ChatComponent from './ChatComponent/ChatComponent'
import OptionsComponent from './OptionsComponent/OptionsComponent'

class MessagesListScreen extends React.Component {
    _displayContactsList = () => {
        // If the screen is showing the option menu, pressing the arrow icon on the header will 
        // go back to the screen of the contact (with the conversation)
        if (this.props.currentDisplayedContactScreen == 'options') {
            const action = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'conversation' }
            this.props.dispatch(action)
        } else {
            // Else, navigates back to the contact list
            const action = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
            this.props.dispatch(action)
        }
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                <HeaderComponent displayContactsList={() => this._displayContactsList()} />
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

export default connect(mapStateToProps)(MessagesListScreen)

