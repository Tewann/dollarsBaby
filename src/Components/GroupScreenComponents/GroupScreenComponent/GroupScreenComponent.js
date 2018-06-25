// src/Components/GroupScreenComponents/GroupScreenComponent/GroupScreenComponent.js
// main view for group screen

import React from 'react'
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import GroupItem from '../GroupItem/GroupItem'

class GroupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group: ""
        }
    }

    _groupInputChanged(text) {
        this.setState({ group: text })
    }

    _addGroup() {
        console.log('add group')
    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.top_container}>
                    <TextInput
                        placeholder='Ajouter un groupe'
                        onChangeText={(text) => this._groupInputChanged(text)}
                        onSubmitEditing={() => this._addGroup()}
                        autoFocus={false}
                        style={styles.text_input}
                        underlineColorAndroid={'transparent'}
                        autoCorrect={false}
                        ref={component => this.messageInput = component}
                    />
                    <TouchableOpacity
                        onPress={() => this._addGroup()}
                        style={styles.cross}>
                        <View style={styles.crossUp} />
                        <View style={styles.crossFlat} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.groupList}
                    numColumns={3}
                    keyboardShouldPersistTaps={'always'}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GroupItem group={item}/>}
                />
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