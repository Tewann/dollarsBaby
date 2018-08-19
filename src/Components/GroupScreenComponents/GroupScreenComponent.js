// src/Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent.js
// main view for group screen

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import GroupList from './GroupListComponent/GroupList'
import GroupOptions from './GroupOptionsComponent/GroupOptions'



class GroupScreen extends React.Component {

    // checks redux store
    // if sets to Group List displays group list component
    _displayGroupList() {
        if (this.props.display === 'GroupList') {
            return (
                <GroupList />
            )
        }
    }

    // checks redux store
    // if redux store is not set to Group List, display the group option component
    _displayGroupOptions() {
        if (this.props.display !== 'GroupList') {
            return (
                <GroupOptions />
            )
        }
    }   

    render() {
        console.log(this.props.display)
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
        groupList: state.groupManagment.groupList,
        display: state.groupManagment.currentDisplayedGroup[0]
    }
}

export default connect(mapStateToProps)(GroupScreen)