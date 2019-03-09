/**
* Called from the Drawer Menu
* Displays the add contact screen :
*  - text input to search contacts in database
*  - flatlist to render the search
*  - items of the flatlist are clickable => add contact
* Props : 
*  - None
*/


import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native'
import styles from './styles'
import { strings } from '../../i18n'

import SearchedContactItem from './SearchedContactItemComponent/SearchedContactItem'

import { Icon } from 'react-native-elements'
//import LinearGradient from 'react-native-linear-gradient'
import { searchContactFirebaseRequest } from '../../Services/firebaseFunctions';

//import { isIphoneX } from '../../Services/is-iphone-x'

class AddContact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactName: "",
            errorMessage: null,
            loading: false,
            data: [],
        }
    }

    _searchContactFirebaseRequest = async (text) => {
        this.setState({ contactName: text, errorMessage: null, loading: true })

        searchContactFirebaseRequest(text)
            .then(res => this.setState({ data: res, loading: false }))
            .catch(err => this.setState({ errorMessage: err }))
    }


    _setErrorMessage(error) {
        this.setState({ errorMessage: error })
    }

    _navigateToMainStackNavigator() {
        this.props.navigation.navigate('MainStackNavigator')
    }
    //*
    // If iPhone used is iPhoneX display top component as normal view
    // If iPhone used is not iPhoneX, displays top component as LinearGradient
    //*
    /*    _displayTopComponent() {
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
                               style={{ padding: 20, }}
                               underlayColor='transparent'
                           />
                       </TouchableOpacity>
                       <View style={[styles.header_subcontainer, { flex: 2 }]} >
                           <Text style={styles.title}>{strings('add_contact_screen.title')}</Text>
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
                       <View style={[styles.header_subcontainer, { flex: 2 }]} >
                           <Text style={styles.title}>{strings('add_contact_screen.title')}</Text>
                       </View>
                   </LinearGradient>
               )
           }
       } */

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#63869f' }}>
                <SafeAreaView>
                    <View style={styles.header_container}>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                            onPress={() => this._navigateToMainStackNavigator()}
                        >
                            <Icon
                                name='chevron-left'
                                color='white'
                                size={35}
                                style={{ padding: 20, }}
                                underlayColor='transparent'
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 2, alignItems: 'center' }}>
                            <Text style={styles.title}>{strings('add_contact_screen.title')}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </SafeAreaView>
                <TextInput
                    placeholder={strings('add_contact_screen.placeholder')}
                    onChangeText={(text) => this._searchContactFirebaseRequest(text)}
                    autoFocus={false}
                    style={styles.text_input}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                    ref={component => this.messageInput = component}
                />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                            {this.state.errorMessage}
                        </Text>
                    }
                    {this.state.loading &&
                        <ActivityIndicator
                            size={'large'}
                            style={{ flex: 1, justifyContent: 'center' }}
                        />
                    }
                    {this.state.loading == false && <FlatList
                        data={this.state.data}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <SearchedContactItem
                            contact={item}
                            setErrorMessage={(error) => this._setErrorMessage(error)}
                            navigateToMainStackNavigator={() => this._navigateToMainStackNavigator()}
                        />}
                    />}
                </View>
            </View>
        )
    }
}



export default AddContact