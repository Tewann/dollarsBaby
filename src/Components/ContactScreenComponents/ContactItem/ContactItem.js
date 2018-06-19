//src/Components/ContactScreenComponents/ContactScreenComponents/ContactItem/ContactItem.js
//Component: display each iteration of contact list

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'




class ContactItem extends React.Component {

    render() {
        const { contact, showMessages } = this.props
        return (

            <TouchableOpacity
                onPress={() => showMessages(contact.id)}
                style={styles.main_container}>
                <Text style={styles.contact_text}>
                    {contact.nom}
                </Text>

            </TouchableOpacity >

        )
    }
}


const mapStateToProps = (state) => {
    return {
        
    }
}
export default connect(mapStateToProps)(ContactItem)