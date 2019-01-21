/**
* Called from the flatlist of the create custom message component
* Displays each sound:
*  - when pressed send back the sound pressed
* Props : 
*  - sound = item of flatlist 
*               sound.title !== undefined when predefined message already in app
*               sound.name !== undefined when sound uploaded by user
*  - createPredefinedMessage = createPredefinedMessage()
*/

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class SoundItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.sound.title,
            uploadedSoundName: this.props.sound.name
        }
    }


    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.createPredefinedMessage(this.props.sound)}
                style={styles.main_container}
            >
                {this.state.message !== undefined && <Text style={styles.text}>
                    {this.state.message}
                </Text>
                }
                {
                    this.state.uploadedSoundName !== undefined && <Text style={styles.text}>
                        {this.state.uploadedSoundName}
                    </Text>
                }
            </TouchableOpacity>
        )
    }
}

export default SoundItem