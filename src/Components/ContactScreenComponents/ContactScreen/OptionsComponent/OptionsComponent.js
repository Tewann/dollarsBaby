/**
* Called from Contact Screen
* Displays the options component :
*  - give a nickname to the contact
* Props : 
*  - displayContactsList : _displayContactsList() => function to navigate back to the contact screen
*/

import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../../i18n'

import { Icon } from 'react-native-elements'
import { modifyNicknameToDatabase } from '../../../../Services/firebaseFunctions'


class MessagesListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: "",
            errorMessage: null,
            loading: false,
            validate: false
        }
    }

    _nicknameInputChanged(text) {
        this.setState({ nickname: text })
    }

    _changeNickname = () => {
        this.setState({ loading: true })
        modifyNicknameToDatabase(this.props.currentUser, this.props.currentDisplayedContact, this.state.nickname)
            .then(() => {
                const action = { type: 'MODIFY_CONTACT_NICKNAME', value: [this.props.currentDisplayedContact, this.state.nickname] }
                this.props.dispatch(action)
                this.setState({ nickname: "", errorMessage: null, loading: false, validate: true })
                //this.textInput.clear()
                setTimeout(() => {
                    const action1 = { type: 'SWITCH_CONTACT_SCREEN_OPTIONS', value: 'conversation' }
                    this.props.dispatch(action1)
                    const action2 = { type: 'SWITCH_CONTACT_SCREEN', value: 'ContactsList' }
                    this.props.dispatch(action2)
                }, 300)
            })
            .catch(err => this.setState({ errorMessage: err }))
    }

    _renderIcon = () => {
        if (this.state.loading == true) {
            return (
                <ActivityIndicator />
            )
        } else if (this.state.nickname != "") {
            return (
                <TouchableOpacity
                    style={styles.icon_container}
                    onPress={() => this._changeNickname()}
                >
                    <Icon
                        name='chevron-with-circle-right'
                        type='entypo'
                        size={30}
                        color='#88b097'
                    />
                </TouchableOpacity>
            )
        }
    }

    _renderTextInput = () => {
        if (this.state.validate == true) {
            return (
                <Icon
                    name='check'
                    type='feather'
                    size={30}
                    color='green'
                />
            )
        } else {
            return (
                <TextInput
                    placeholder={strings('contacts_screen.options.placeholder')}
                    onChangeText={(text) => this._nicknameInputChanged(text)}
                    autoFocus={false}
                    style={styles.text_input}
                    autoCorrect={true}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.profil_item_containers}>
                <View style={styles.profil_item}>
                    <Text style={styles.nickname}>{strings('contacts_screen.options.rename')}</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.errorMessage}
                        </Text>}
                    <View style={styles.input_container}>
                        {this._renderTextInput()}
                        {this._renderIcon()}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations.name,
        currentDisplayedContact: state.contactManagment.currentDisplayedContact[0]
    }
}

export default connect(mapStateToProps)(MessagesListScreen)

