/**
* Called from the Drawer Menu
* Displays the add groups screen :
*  - text input to join public groups in database or to create private/public group
*  - groups to render the search
*  - items of the flatlist are clickable => add group
* Props : 
*  - None
*/


import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import styles from './styles'
import { strings } from '../../i18n'
import { connect } from 'react-redux'

import SearchedGroupItem from './SearchedGroupItem/SearchedGroupItem'

import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { joinPublicGroupInFirestore, createGroupInFirestore, addContactToPrivateGroup, searchPublicGroupInDatabase } from '../../Services/firebaseGroupFunctions'

import { isIphoneX } from '../../Services/is-iphone-x'
import { TextInput } from 'react-native-gesture-handler';

class AddGroupsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            groupType: null,
            createOrJoin: null,
            groupName: "",
            loading: false,
            confirmationMessage: null,
            data: []
        }
    }

    _textInputChanged = (text) => {
        this.setState({ groupName: text })
        if (this.state.createOrJoin === 'join') {
            this.setState({ loading: true })
            searchPublicGroupInDatabase(text)
            .then(res => this.setState({ data: res, loading: false }))
            .catch(err => this.setState({ errorMessage: err }))
        }
    }

    _setErrorMessage(error) {
        this.setState({ errorMessage: error })
    }

    _navigateToMainStackNavigator() {
        this.props.navigation.navigate('MainStackNavigator')
    }

    _createGroup = async () => {
        this.setState({ errorMessage: null, loading: true })
        // Checks if the user has entered a value
        if (this.state.groupName.length > 0) {
            // firebase function : checks if name avaible then create group
            await createGroupInFirestore(this.state.groupName, this.props.currentUser, this.state.groupType)
                .then(async () => {
                    if (this.state.groupType === 'private') {
                        // if private group successfully created
                        // add creator to contact of the group
                        await addContactToPrivateGroup(this.state.groupName, this.props.currentUser)
                            .catch(err => { this.setState({ errorMessage: err }) })
                    } else if (this.state.groupType === 'public') {
                        await joinPublicGroupInFirestore(this.state.groupName, this.props.currentUser)
                            .catch(err => this.setState({ errorMessage: err }))
                    }
                    const confirmationMsg = strings('add_groups_screen.group_created')
                    this.setState({ groupType: null, createOrJoin: null, groupName: "", errorMessage: null, loading: false, confirmationMessage: confirmationMsg })
                    setTimeout(() => {
                        this.setState({ confirmationMessage: null })
                    }, 2000)
                })
                .catch((error) => {
                    if (error => 'Group name taken') {
                        // if group already exists
                        this.setState({ errorMessage: strings('add_groups_screen.existing_group'), loading: false })
                    } else {
                        this.setState({ errorMessage: error, groupType: null, createOrJoin: null, groupName: "", loading: false, confirmationMessage: null })
                    }
                })

        } else {
            this.setState({ errorMessage: strings('add_groups_screen.input_length_is_O'), loading: false })
        }
    }

    //*
    // If iPhone used is iPhoneX display top component as normal view
    // If iPhone used is not iPhoneX, displays top component as LinearGradient
    //*
    _displayTopComponent() {
        const iPhoneX = isIphoneX() ? true : false
        // If iPhone used is iPhoneX
        if (iPhoneX) {
            return (
                <View style={[styles.header_container, { backgroundColor: '#07416b' }]}>
                    <TouchableOpacity
                        style={[styles.header_subcontainer, { flex: 1, paddingLeft: 10 }]}
                        onPress={() => this._navigateToMainStackNavigator()}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            style={{ padding: 20 }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View style={[styles.header_subcontainer, { flex: 3 }]} >
                        <Text style={styles.title}>{strings('add_groups_screen.title')}</Text>
                    </View>
                </View>
            )
        } else {
            // If iPhone used is not iPhoneX
            return (
                <LinearGradient
                    style={styles.header_container}
                    colors={['#07416b', '#88b097', '#88b097', '#07416b']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <TouchableOpacity
                        style={[styles.header_subcontainer, { flex: 1, paddingLeft: 10 }]}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='white'
                            size={35}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View style={[styles.header_subcontainer, { flex: 3 }]} >
                        <Text style={styles.title}>{strings('add_groups_screen.title')}</Text>
                    </View>
                </LinearGradient>
            )
        }
    }

    _renderButtonsContainer = () => {
        // If no group type defined: render buttons to choose the group type
        if (this.state.groupType === null) {
            return (
                <View style={styles.button_container}>
                    <Button
                        title={strings('add_groups_screen.private_group')}
                        rounded
                        buttonStyle={styles.button}
                        onPress={() => this.setState({ groupType: 'private', createOrJoin: 'create' })}
                    />
                    <Button
                        title={strings('add_groups_screen.public_group')}
                        rounded
                        buttonStyle={styles.button}
                        onPress={() => this.setState({ groupType: 'public' })}
                    />
                </View>
            )
        } else {
            // Render the type of the group
            const groupTypeDisplay = this.state.groupType === 'public' ? strings('add_groups_screen.public_group') : strings('add_groups_screen.private_group')
            let createOrJoin = null
            if (this.state.createOrJoin !== null) {
                createOrJoin = this.state.createOrJoin === 'create' ? strings('add_groups_screen.create') + ' : ' : strings('add_groups_screen.join') + ' : '
            }
            return (
                <View style={styles.group_title_container}>
                    <Icon
                        name='cancel'
                        type='materialcommunityicons'
                        color='#517fa4'
                        size={30}
                        onPress={() => this.setState({ confirmationMessage: null, groupType: null, createOrJoin: null, groupName: "", errorMessage: null, loading: false })}
                    />
                    <Text style={styles.groupTypeText}>{createOrJoin}{groupTypeDisplay}</Text>
                </View>
            )
        }
    }

    // Render create or join buttons only for publics groups when the type of the group has been choosed
    _renderCreateOrJoinGroupButtonsForPublicGroups = () => {
        if (this.state.groupType === 'public' && this.state.createOrJoin === null) {
            return (
                <View style={styles.button_container}>
                    <Button
                        title={strings('add_groups_screen.create')}
                        rounded
                        buttonStyle={styles.button}
                        onPress={() => this.setState({ createOrJoin: 'create' })}
                    />
                    <Button
                        title={strings('add_groups_screen.join')}
                        rounded
                        buttonStyle={styles.button}
                        onPress={() => this.setState({ createOrJoin: 'join' })}
                    />
                </View>
            )
        }
    }

    _renderTextInput = () => {
        if (this.state.createOrJoin !== null && this.state.groupType !== null) {
            return (
                <TextInput
                    placeholder={strings('add_groups_screen.name_of_the_group')}
                    onChangeText={(text) => this._textInputChanged(text)}
                    autoFocus={true}
                    style={styles.text_input}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                />
            )
        }
    }

    _renderJoinOrCreateComponent = () => {
        if (this.state.loading) {
            return (
                <ActivityIndicator size="small" color="#0000ff" />
            )
        } else if (this.state.createOrJoin === 'create') {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button
                        title={strings('add_groups_screen.create')}
                        rounded
                        buttonStyle={styles.create_button}
                        onPress={() => this._createGroup()}
                    />
                </View>
            )
        } else if (this.state.createOrJoin === 'join' && this.state.groupType === 'public') {
            return (

                <FlatList
                    data={this.state.data}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <SearchedGroupItem
                        group={item}
                        setErrorMessage={(error) => this._setErrorMessage(error)}
                        navigateToMainStackNavigator={() => this._navigateToMainStackNavigator()}
                    />}
                />
            )
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#07416b' }}>
                <View
                    style={{ flex: 1, backgroundColor: 'white' }}
                >
                    {this._displayTopComponent()}
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', textAlign: 'center', marginTop: 15 }}>
                            {this.state.errorMessage}
                        </Text>
                    }
                    {this.state.confirmationMessage &&
                        <Text style={{ color: 'green', textAlign: 'center', marginTop: 15 }}>
                            {this.state.confirmationMessage}
                        </Text>
                    }
                    {this._renderButtonsContainer()}
                    {this._renderCreateOrJoinGroupButtonsForPublicGroups()}
                    {this._renderTextInput()}
                    {this._renderJoinOrCreateComponent()}
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.getCurrentUserInformations.name,
    }
}


export default connect(mapStateToProps)(AddGroupsScreen)