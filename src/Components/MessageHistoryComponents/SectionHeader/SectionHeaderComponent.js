// Component for the sections in SectionList
// Called by MessageHistoryScreen (parent folder)
// Displays stylized date

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { strings } from '../../../i18n'

class SectionHeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            day: null,
            month: null,
            year: null
        }

    }
    componentWillMount() {
        const titleSplitted = this.props.section.title.split('/')
        const year = titleSplitted[0]
        const monthNumber = titleSplitted[1] - 1
        const day = titleSplitted[2]
        const monthNames = [
            strings('month.january'),
            strings('month.february'),
            strings('month.march'),
            strings('month.april'),
            strings('month.may'),
            strings('month.june'),
            strings('month.july'),
            strings('month.august'),
            strings('month.september'),
            strings('month.october'),
            strings('month.november'),
            strings('month.december'),
        ];
        const month = monthNames[monthNumber]
        this.setState({
            day: day,
            month: month,
            year: year
        })
    }
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.sub_container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.border_top_lign_container} />
                        <View style={styles.top_lign_container}></View>
                        <View style={styles.border_top_lign_container} />
                    </View>
                    <View style={styles.bottom_lign_container}></View>
                </View>
                <Text style={styles.date}>{this.state.day} {this.state.month} {this.state.year}</Text>
                <View style={styles.sub_container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.border_top_lign_container} />
                        <View style={styles.top_lign_container}></View>
                        <View style={styles.border_top_lign_container} />
                    </View>
                    <View style={styles.bottom_lign_container}></View>
                </View>
            </View>
        )
    }
}

export default SectionHeaderComponent