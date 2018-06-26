// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Component Group Options on Group Screen

import React from 'react'
import { View, TouchableOpacity, TextInput, Text, FlatList } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MessageItem from '../MessageItem/MessageItem'
 
class GroupOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        },
        switchScreen = this.props.switchScreen
    }

    // Updating redux state in order to send addionnal text with predefined messages
    _messageToSendChanged(text) {
        const action = { type: 'MESSAGE_TO_SEND', value: text }
        this.props.dispatch(action)
    }

    render() {
        return (
            <View style={styles.messagelist_main_container}>
                    <TouchableOpacity
                        style={styles.back_to_contacts}
                        onPressIn={() => switchScreen()}>
                        <Icon name='chevron-left' color='#889eb0'/>
                        <Text style={styles.retour}>Retour</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Message 100 caractères maximum'
                        onChangeText={(text) => this._messageToSendChanged(text)}
                        //onSubmitEditing={() => {}}
                        style={styles.text_input}
                        underlineColorAndroid={'white'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <FlatList
                        data={this.props.predefinedMessagesList}
                        numColumns={2}
                        columnWrapperStyle={styles.flatlist}
                        keyboardShouldPersistTaps={'always'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MessageItem message={item}
                        returnToGroupListScreen={() => switchScreen()} />}
                    />
                </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList
    }
}
export default connect(mapStateToProps)(GroupOptions)