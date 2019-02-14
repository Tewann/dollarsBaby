//*
// src/Components/GroupScreenComponents/GroupScreenComponent/GroupOptionsComponent/GroupOptions
// Group Option Component
// Called by group screen
// Displays group name, photo and messages to send (if user has created group)
//*


import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'

import ChatComponent from './ChatComponent/ChatComponent'
import OptionsComponent from './OptionsComponent/OptionsComponent'
import { retrivingContacts } from '../../../Services/firebaseGroupFunctions'

class GroupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPicture: require('../../../../images/ic_tag_faces.png'),
            errorMessage: null,
        }
    }

    // Before component mount, set screen on conversation
    componentWillMount = () => {
        const action = { type: 'SWITCH_GROUP_SCREEN_OPTIONS', value: 'options' }
        this.props.dispatch(action)
    }

    componentDidMount = async () => {
        // Each time a private group is open, check data base and get contacts
        if (this.props.currentDisplayedGroupType == 'private') {
            retrivingContacts(this.props.currentGroup)
        }
    }

    _displayGroupsList = () => {
        this.props.navigation.navigate('GroupsList')
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.props.currentDisplayedGroupScreen == 'conversation' &&
                    <ChatComponent displayGroupsList={() => this._displayGroupsList()} />
                }
                {this.props.currentDisplayedGroupScreen == 'options' &&
                   <OptionsComponent />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentGroup: state.groupManagment.currentDisplayedGroup[0],
        groupList: state.groupManagment.groupList,
        currentDisplayedGroupScreen: state.groupManagment.currentDisplayedGroupScreen,
        currentDisplayedGroupType: state.groupManagment.currentDisplayedGroupType,
    }
}

export default connect(mapStateToProps)(GroupScreen)
