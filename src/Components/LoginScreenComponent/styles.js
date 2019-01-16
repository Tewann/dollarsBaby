// Style for Login Screen

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#40495a'
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    textShadowOffset: { width: 2, height: 2 },
  },
  LoginButton: {
    borderRadius: 75,
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    //backgroundColor: 'white'
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  noAccount: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 75,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
    paddingBottom: 0,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  }
})

export default styles