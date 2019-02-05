// Component top of message history screen
// Displays trash button to delete all message in history

import React from 'react'
import { TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { connect } from 'react-redux'


class CleanHistoryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            deleteIcon: true,
            deleteSuccessful: false
        }
    }
    deleteHistory = async () => {
        this.setState({ deleteIcon: false, deleteSuccessful: true })
        const action = { type: 'DELETE_MESSAGE_HISTORY', value: 'messagesReceived' }
        this.props.dispatch(action)
        setTimeout(() => {
            this.setState({ deleteSuccessful: false, deleteIcon: true })
        }, 1000)
    }

    render() {
        if (this.props.messagesReceived.length != 0) {
            return (
                <View style={styles.main_container}>
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
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        messagesReceived: state.displayMessagesList.messagesReceived,
    }
}

export default connect(mapStateToProps)(CleanHistoryComponent)