// src/Components/GroupScreenComponents/GroupScreenComponent/GroupList/GroupList.js
// Component Group List on Group Screen

import React from 'react'
import { Text, View, FlatList } from 'react-native'
import styles from './styles'
import GroupItem from './GroupItem/GroupItem'
import { connect } from 'react-redux'
import { strings } from '../../../i18n'
import { Icon } from 'react-native-elements'


class GroupList extends React.Component {

    renderListEmpty = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.list_empty_text1}>{strings('groups_screen.groups_screen.list_empty')}</Text>
                <View style={styles.list_empty_text2_container}>
                <Text>{strings('groups_screen.groups_screen.list_empty2')}</Text>
                    <Icon
                        name="menu"
                    />
                    <Text>{strings('groups_screen.groups_screen.list_empty3')}</Text>
                </View>

            
            </View>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={this.props.groupList}
                    numColumns={3}
                    keyboardShouldPersistTaps={'handled'}
                    ListEmptyComponent={() => this.renderListEmpty()}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <GroupItem
                        group={item}
                    />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupList: state.groupManagment.groupList,
    }
}

export default connect(mapStateToProps)(GroupList)
