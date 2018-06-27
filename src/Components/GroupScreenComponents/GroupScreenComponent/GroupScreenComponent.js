// src/Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent.js
// main view for group screen

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import GroupList from './GroupListComponent/GroupList'
import GroupOptions from './GroupOptionsComponent/GroupOptions'



class GroupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayGroupList: true,
            displayGroupOptions: false,
            groupName: "",
            groupContacts: []
        }
    }

    // Change state to display group option screen
    _goToGroupOptionsScreen = (groupName, groupContacts) => {
        this.setState({ displayGroupList: false })
        this.setState({ displayGroupOptions: true })
        this.setState({ groupName: groupName, groupContacts: groupContacts })
    }

    _goToGroupListScreen = () => {
        this.setState({ displayGroupOptions: false })
        this.setState({ displayGroupList: true })
    }

    // function getting GroupList component and displaying it
    _displayGroupList() {
        if (this.state.displayGroupList) {
            return (
                <GroupList switchScreen={this._goToGroupOptionsScreen} />
            )
        }
    }

    // function getting GroupOptions component and displaying it
    _displayGroupOptions() {
        if (this.state.displayGroupOptions) {
            return (
                <GroupOptions 
                switchScreen={this._goToGroupListScreen}
                groupName={this.state.groupName}
                groupId={this.state.group}
                groupContacts={this.state.groupContacts} />
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayGroupList()}
                {this._displayGroupOptions()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList
    }
}

export default connect(mapStateToProps)(GroupScreen)