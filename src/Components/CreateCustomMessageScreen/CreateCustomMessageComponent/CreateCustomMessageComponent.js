/**
* Called from the Create custom message screen
* Displays the create custom message component:
*  - ability to create a predefined message and associate a sound
*  - displayed only when custom message number is lower than 3
* Props : 
*  - 
*/


import React from 'react'
import { Text, View, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { strings } from '../../../i18n'

import { getUploadedSoundsByUser, setUploadedSoundDestination } from '../../../Services/firebaseFunctions'

import { Button } from 'react-native-elements'
import SoundItem from './SoundItem/SoundItem'

class CreateCustomMessageComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayed: 'chooseType',
            predefinedMessage: '',
            soundsUploadedByUser: [],
            messageType: ''
        }
    }

    componentWillMount = async () => {
        await this.setSoundsOfUser()
    }

    setSoundsOfUser = async () => {
        const sounds = await getUploadedSoundsByUser(this.props.userName)
        this.setState({ soundsUploadedByUser: sounds })
    }

    definePredefinedMessage = () => {
        if (this.state.predefinedMessage.length > 0) {
            this.setState({ displayed: 'addSound' })
        }
    }

    createPredefinedMessage = async (customSound) => {
        // Sound is a predefined sound of the app
        if (customSound.title !== undefined) {
            const title = this.state.predefinedMessage
            const soundName = customSound.sound
            const messageFor = this.state.messageType
            const action = { type: 'ADD_CUSTOM_PREDEFINED_MESSAGE', value: { title: title, soundName: soundName, messageFor: messageFor } }
            this.props.dispatch(action)
            // Sound is one that the user has uploaded 
        } else {
            const title = this.state.predefinedMessage
            const sound = customSound.name
            const soundName = customSound.newFileName
            const messageFor = this.state.messageType
            await setUploadedSoundDestination(this.props.userName, sound, messageFor)
                .catch(err => console.log(err))
            const action = { type: 'ADD_CUSTOM_PREDEFINED_MESSAGE', value: { title: title, sound: sound, soundName: soundName, messageFor: messageFor } }
            this.props.dispatch(action)
        }
        this.setState({ displayed: 'chooseType' })
    }

    defineType = (type) => {
        this.setState({ displayed: 'addPredefined', messageType: type })
    }

    renderChooseType = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Button
                    title={strings('create_custom_message_screen.contacts_and_groups')}
                    rounded
                    buttonStyle={{ width: 300, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                    onPress={() => this.defineType('All')}
                />
                <Button
                    title={strings('create_custom_message_screen.contacts')}
                    rounded
                    buttonStyle={{ width: 300, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                    onPress={() => this.defineType('Contacts')}
                />
                <Button
                    title={strings('create_custom_message_screen.groups')}
                    rounded
                    buttonStyle={{ width: 300, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                    onPress={() => this.defineType('Groups')}
                />
            </View>
        )
    }

    renderAddPredefined = () => {
        return (
            <View style={styles.add_predefined_message}>
                <Text style={styles.title}>{strings('create_custom_message_screen.add_custom_message')}</Text>
                <TextInput
                    placeholder={strings('create_custom_message_screen.message')}
                    style={styles.textInput}
                    onChangeText={text => this.setState({ predefinedMessage: text })}
                    underlineColorAndroid={'transparent'}
                    autoFocus={false}
                    maxLength={14}
                />
                <Button
                    buttonStyle={{ maxWidth: 150, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                    title={strings('create_custom_message_screen.next')}
                    fontSize={12}
                    rounded
                    onPress={() => this.definePredefinedMessage()}
                />
            </View>
        )
    }

    renderAddSound = () => {
        return (
            <View style={styles.add_sound}>
                <View style={styles.add_sound_title_container}>
                    <Text style={[styles.title, { fontSize: 20 }]}>{this.state.predefinedMessage}</Text>
                    <Text style={styles.title}>{strings('create_custom_message_screen.add_sound')}</Text>
                </View>
                <View style={styles.flatlists_container}>
                    <FlatList
                        data={this.props.predefinedSoundList.slice(0, 6)}
                        numColumns={3}
                        columnWrapperStyle={styles.flatlist}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <SoundItem
                            sound={item}
                            createPredefinedMessage={(sound) => this.createPredefinedMessage(sound)}
                        />}
                    />
                    { this.state.messageType === 'Groups' && <FlatList
                        data={this.state.soundsUploadedByUser}
                        numColumns={3}
                        columnWrapperStyle={styles.flatlist}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        keyExtractor={(item) => item.newFileName.toString()}
                        renderItem={({ item }) => <SoundItem
                            sound={item}
                            createPredefinedMessage={(sound) => this.createPredefinedMessage(sound)}
                        />}
                    />}
                    <View style={{ alignItems: 'center' }}>
                        <Button
                            buttonStyle={{ maxWidth: 150, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                            fontSize={12}
                            rounded
                            onPress={() => this.setSoundsOfUser()}
                            icon={{ name: 'cached' }}
                            title={strings('create_custom_message_screen.update_sound')} />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.state.displayed === 'chooseType' && this.renderChooseType()}
                {this.state.displayed === 'addPredefined' && this.renderAddPredefined()}
                {this.state.displayed === 'addSound' && this.renderAddSound()}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        predefinedSoundList: state.displayMessagesList.predefinedMessagesList,
        userName: state.getCurrentUserInformations.name
    }
}

export default connect(mapStateToProps)(CreateCustomMessageComponent)