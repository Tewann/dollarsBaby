// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions/PublicGroupOptionsCreatorComponent
// component for creators of publics groups only
// show flatlist of messages to send
// change group image

import React from 'react'
import { View, TextInput, FlatList } from 'react-native'
import styles from './styles'
import MessageItem from '../MessageItem/MessageItem'
import { connect } from 'react-redux'

class PublicGroupOptionsCreator extends React.Component {
    render() {
        return (
            <View>
                <View>
                    <TextInput
                        placeholder='Message 100 caractères maximum'
                        onChangeText={(text) => this._messageToSendChanged(text)}
                        style={styles.text_input}
                        underlineColorAndroid={'white'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <FlatList
                        data={this.props.predefinedMessagesList}
                        numColumns={2}
                        columnWrapperStyle={styles.message_flatlist}
                        keyboardShouldPersistTaps={'always'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MessageItem message={item}
                            returnToGroupListScreen={() => switchScreen()} />}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedMessagesList: state.displayMessagesList.predefinedMessagesList,
    }
}

export default connect(mapStateToProps)(PublicGroupOptionsCreator)