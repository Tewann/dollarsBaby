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
            displayGroupList: false,
            displayGroupOptions: true,
        }
    }

    // Change state to display group option screen
    _goToGroupOptionsScreen = () => {
        this.setState({ displayGroupList: false })
        this.setState({ displayGroupOptions: true })
    }

    _goToGroupListScreen = () => {
        this.setState({ displayGroupOptions: false })
        this.setState({ displayGroupList: true })
    }

    // function getting GroupList component and displaying it
    _displayGroupList() {
        if (this.state.displayGroupList) {
            return (
                <GroupList switchScreen={this._goToGroupOptionsScreen}/>
            )
        }
    }

    // function getting GroupOptions componenet and displaying it
    _displayGroupOptions() {
        if (this.state.displayGroupOptions) {
            return (
                <GroupOptions switchScreen={this._goToGroupListScreen}/>
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