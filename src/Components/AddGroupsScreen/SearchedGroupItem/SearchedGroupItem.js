/**
* Called from the Add group screen
* Displays the searched group item component:
*  - for each iteration of the flatlist renders 
*  - group name result
*  - item is clickable => join group function
* Props : 
*  - group = flatlist item
*  - setErrorMessage() => displays error message in the add group screen
*  - navigateToMainStackNavigator() => this.props.navigation.navigate('MainStackNavigator')
*/


import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import { strings } from '../../../i18n'

import { joinPublicGroupInFirestore } from '../../../Services/firebaseGroupFunctions'
import { Icon } from 'react-native-elements'

class SearchedGroupItem extends React.Component {
    constructor(props) {
        super(props)
        this.picture = require('../../../../images/ic_tag_faces.png')
        this.state = {
            groupRequestSended: false,
            defaultContainer: true,
        }
    }

    /**
     * Check if the group is already in the group list
     * If not join the group
     */
    _checkIfGroupAlreadyInUserGroupListThenAddGroup = async () => {
        const groupNameIndex = this.props.groupList.findIndex(item =>
            (item.name === this.props.group.name) && item.type === 'public')
        if (groupNameIndex !== -1) {
            Alert.alert(
                strings('add_groups_screen.item.error_title'),
                strings('add_groups_screen.item.error_already_in_list'),
                [
                    { text: strings('add_groups_screen.item.close_button') }
                ]
            )
        } else {
            await this._joinPublicGroup()
        }
    }

    _joinPublicGroup = async () => {
        await joinPublicGroupInFirestore(this.props.group.name, this.props.currentUser)
            .then((res) => {
                this.setState({ groupRequestSended: true, defaultContainer: false })
                setTimeout(() => {
                    this.props.navigateToMainStackNavigator()
                }, 2000)
            })
            .catch(err => this.props.setErrorMessage(err))
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._checkIfGroupAlreadyInUserGroupListThenAddGroup()}>
                {this.state.defaultContainer &&
                    <View style={styles.defaultContainer}>
                        <Image
                            source={this.picture}
                            style={styles.rounds}
                        />
                        <Text style={styles.text}>
                            {this.props.group.name}
                        </Text>
                    </View>
                }
                {this.state.groupRequestSended &&
                    <View style={styles.groupRequestSended}>
                        <Icon
                            name='check'
                            type='entypo'
                            color='green'
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations.name,
        groupList: state.groupManagment.groupList,
    }
}

export default connect(mapStateToProps)(SearchedGroupItem)