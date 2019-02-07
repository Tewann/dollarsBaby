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
import { modifyNicknameToDatabase, deleteContact } from '../../../../Services/firebaseFunctions'


class MessagesListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: "",
            errorMessage: null,
            loading: false,
            validate: false,
            deleteIcon: true,
            deleteSuccessful: false,
            deleteContactIcon: true,
            deleteContactConfirmation: false,
            deleteContactLoading: false
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

    deleteHistory = async () => {
        this.setState({ deleteIcon: false, deleteSuccessful: true })
        const action = { type: 'DELETE_MESSAGE_HISTORY', value: this.props.currentUser }
        this.props.dispatch(action)
        setTimeout(() => {
            this.setState({ deleteSuccessful: false, deleteIcon: true })
        }, 1000)

    }

    renderDeleteHistory = () => {
        return (
            <View style={styles.profil_item}>
                <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_history')}</Text>
                {this.state.deleteSuccessful &&
                    <Icon
                        name='check'
                        type='feather'
                        size={30}
                        color='green'
                    />
                }
                {this.state.deleteIcon &&
                    <Icon
                        name='trash'
                        type='evilicon'
                        color='#517fa4'
                        size={50}
                        onPress={() => this.deleteHistory()}
                    />
                }
            </View>
        )
    }

    renderDeleteContact = () => {
        return (
            <View style={styles.profil_item}>
                {this.state.deleteContactLoading && <ActivityIndicator />}
                {this.state.deleteContactConfirmation &&
                    <View>
                        <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_contact_confirmation')}</Text>
                        <Icon
                            name='trash'
                            type='evilicon'
                            color='#517fa4'
                            size={50}
                            onPress={() => {
                                this.setState({ deleteContactConfirmation: false, deleteContactLoading: true})
                                deleteContact(this.props.currentUser, this.props.currentDisplayedContact)
                            }}
                        />
                    </View>
                }
                {this.state.deleteContactIcon &&
                    <View>
                        <Text style={[styles.title, { marginBottom: 10 }]}>{strings('groups_screen.group_options.delete_contact')}</Text>
                        <Icon
                            name='trash'
                            type='evilicon'
                            color='#517fa4'
                            size={50}
                            onPress={() => this.setState({ deleteContactIcon: false, deleteContactConfirmation: true })}
                        />
                    </View>
                }
            </View>
        )
    }
    render() {
        return (
            <View style={styles.profil_item_containers}>
                <View style={styles.profil_item}>
                    <Text style={styles.title}>{strings('contacts_screen.options.rename')}</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>
                            {this.state.errorMessage}
                        </Text>}
                    <View style={styles.input_container}>
                        {this._renderTextInput()}
                        {this._renderIcon()}
                    </View>
                </View>
                {this.renderDeleteHistory()}
                {this.renderDeleteContact()}
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

