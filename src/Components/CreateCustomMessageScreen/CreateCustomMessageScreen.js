/**
* Called from the Drawer Menu
* Displays the Create custom message screen :
*  - 
* Props : 
*  - None
*/


import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import styles from './styles'
import { strings } from '../../i18n'

import CustomMessageComponent from './CustomMessageComponent/CustomMessageComponent'
import CreateCustomMessageComponent from './CreateCustomMessageComponent/CreateCustomMessageComponent'

import { Icon } from 'react-native-elements'
//import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

//import { isIphoneX } from '../../Services/is-iphone-x'

class CreateCustomMessageScreen extends React.Component {
    _displayTopComponent() {
        return (
            <SafeAreaView>
                <View style={styles.header_container}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                        onPress={() => this.props.navigation.navigate('MainStackNavigator')}
                    >
                        <Icon
                            name='chevron-left'
                            color='#07416b'
                            size={35}
                            style={{ padding: 20, }}
                            underlayColor='transparent'
                        />
                    </TouchableOpacity>
                    <View
                        style={{ justifyContent: 'center', flex: 4, alignItems: 'center' }}
                    >
                        <Text style={styles.title}>{strings('create_custom_message_screen.title')}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
            </SafeAreaView>
        )
    }

    _openEblinkWebsite = () => {
        Linking.openURL("https://eblink-d7c9a.firebaseapp.com/")
    }

    render() {
        return (
            <View style={{ flexGrow: 1, backgroundColor: 'white' }}>
                {this._displayTopComponent()}
                <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                    {this.props.predefinedSoundList.length < 9 && <View >
                        <Text style={styles.list_title}>{strings('create_custom_message_screen.create_message')}</Text>
                        <CreateCustomMessageComponent />
                    </View>
                    }
                    <View style={styles.flatlist_container}>
                        <Text style={styles.list_title}>{strings('create_custom_message_screen.message(s)')}</Text>
                        <FlatList
                            data={this.props.predefinedSoundList.slice(6, 9)}
                            keyExtractor={item => item.id.toString()}
                            keyboardShouldPersistTaps={'handled'}
                            /*                              ListFooterComponent={<View style={styles.footerComponent}>
                                                             <TouchableOpacity
                                                                 onPress={() => this._openEblinkWebsite()}
                                                                 style={styles.button_container}
                                                             >
                                                                 <Text style={styles.text_information}>{strings('create_custom_message_screen.only_groups')}</Text>
                                                                 <Text style={styles.text_information}>{strings('create_custom_message_screen.add_your_sounds')}</Text>
                                                                 <Text style={styles.text_information}>{strings('create_custom_message_screen.click_me')}</Text>
                                                             </TouchableOpacity>
                                                         </View>} */
                            renderItem={({ item }) => <CustomMessageComponent
                                message={item}
                            />}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        predefinedSoundList: state.displayMessagesList.predefinedMessagesList,
    }
}

export default connect(mapStateToProps)(CreateCustomMessageScreen)