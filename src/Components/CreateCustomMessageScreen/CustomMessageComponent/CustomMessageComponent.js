/**
* Called from the Create custom message screen
* Displays the custom message component:
*  - ability to create a predefined message and associate a sound
*  - component for flatlist
* Props : 
*  - message : custom message from flatlist item
*/


import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { strings } from '../../../i18n'
import { Button } from 'react-native-elements';


class CustomMessageComponent extends React.Component {
    deleteMessage = () => {
        const action = {
            type: 'DELETE_CUSTOM_PREDEFINED_MESSAGE',
            value: { id: this.props.message.id }
        }
        this.props.dispatch(action)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.subs_containers}>
                    <View style={styles.sub_container}>
                        <Text style={styles.title}>{strings('create_custom_message_screen.name')}</Text>
                        <Text style={styles.text}>{this.props.message.title}</Text>
                    </View>
                    <View style={styles.sub_container}>
                        <Text style={styles.title}>{strings('create_custom_message_screen.soundName')}</Text>
                        <Text style={styles.text}>{this.props.message.sound}</Text>
                    </View>
                    <View style={styles.sub_container}>
                        <Text style={styles.title}>{strings('create_custom_message_screen.messageFor')}</Text>
                        <Text style={styles.text}>{this.props.message.messageFor}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        buttonStyle={{ maxWidth: 150, marginBottom: 6, marginTop: 6, backgroundColor: '#0086b3' }}
                        fontSize={12}
                        rounded
                        onPress={() => this.deleteMessage()}
                        icon={{ name: 'delete', color: 'white' }}
                        title={strings('create_custom_message_screen.delete_message')}/>
                </View>
            </View>
        )
    }
}


export default connect()(CustomMessageComponent)