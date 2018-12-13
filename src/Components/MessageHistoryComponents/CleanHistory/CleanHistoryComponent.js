// Component top of message history screen
// Displays trash button to delete all message in history

import React from 'react'
import { TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { cleaningMessageHistory } from '../../../Services/firebaseFunctions'
import { connect } from 'react-redux'


class CleanHistoryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    cleanHistory = async () => {
        this.setState({ loading: true })
        cleaningMessageHistory()
            .then(() => this.setState({ loading: false }))
            .catch(err => this.setState({ loading: false }))
    }

    render() {
        return (
            <View>
                {
                    this.props.messagesHistory.length != 0 &&
                    <TouchableOpacity
                        style={styles.main_container}
                        onPress={() => this.cleanHistory()}
                    >
                        {this.state.loading == false &&
                            <Icon
                                name='trash'
                                type='evilicon'
                                color='#517fa4'
                                size={40}
                            />
                        }
                        {this.state.loading == true &&
                            <ActivityIndicator
                                size="small"
                                color="#517fa4"
                            />
                        }
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messagesHistory: state.displayMessagesList.messagesHistory,
    }
}

export default connect(mapStateToProps)(CleanHistoryComponent)