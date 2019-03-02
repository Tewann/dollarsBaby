//*
// src/Components/TermsOfServiceScreen/TermsOfService.js
// Terms Of Service Screen
//*

import React from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import styles from './styles'
import { strings } from '../../i18n'
import Store from '../../Store/configureStore'


class TermsOfService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            buttonDisabled: true,
            declineMessage: null,
        }
    }

    //*
    // OnPress : accepted button
    // When TOS is accepted
    //*
    accepted = () => {
        const action = {
            type: 'TOS_ACCEPTED',
        }
        Store.dispatch(action)
        this.props.navigation.navigate('Loading')
    }

    //*
    // OnPress : decline button
    // When TOS is decline
    //*
    declined = () => {
        const newDeclineMessage = strings('terms_of_service.decline_message')
        this.setState({
            declineMessage: newDeclineMessage,
            buttonDisabled: true,
            checked: false
        })
    }

    //*
    // OnPress checkbox :
    // Change check state and disabled status
    //*
    switchCheckState = () => {
        const newCheckedState = this.state.checked === false ? true : false
        const disableState = newCheckedState === false ? true : false
        this.setState({
            checked: newCheckedState,
            buttonDisabled: disableState,
            declineMessage: null
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.topText}>{strings('terms_of_service.title')}</Text>
                </SafeAreaView>
                {this.state.declineMessage &&
                    <Text style={styles.declineMessage}>{this.state.declineMessage}</Text>
                }
                <ScrollView 
                style={styles.scrollView}
               //contentContainerStyle={{height: 8000}}
                >

                    <Text style={styles.TOS} >
                        {strings('terms_of_service.TOS1')}
                    </Text>
                    <Text style={styles.TOS} >
                        {strings('terms_of_service.TOS2')}
                    </Text>
                    <Text style={styles.TOS} >
                        {strings('terms_of_service.TOS3')}
                    </Text>
                   
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <CheckBox
                        title={strings('terms_of_service.checkbox')}
                        checked={this.state.checked}
                        onPress={this.switchCheckState}
                        //containerStyle={{ marginRight: 15 }}
                    />
                    <View style={styles.buttonsView}>
                        <Button
                            onPress={this.accepted}
                            title={strings('terms_of_service.accept')}
                            backgroundColor='white'
                            color='grey'
                            buttonStyle={styles.button}
                            disabled={this.state.buttonDisabled}
                            disabledTextStyle={{ color: 'white' }}
                            disabledStyle={{ backgroundColor: 'white' }}
                        />
                        <View style={{ borderWidth: 0.5 }} />
                        <Button
                            onPress={this.declined}
                            title={strings('terms_of_service.decline')}
                            backgroundColor='white'
                            color='grey'
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default TermsOfService