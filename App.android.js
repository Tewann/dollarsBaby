import React from 'react';
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import { Keyboard, AppState } from 'react-native'
import AppContainer from './src/Navigation/Navigation'
import BannerComponent from './src/Components/BannerComponent/BannerComponent'
import NavigatorService from './src/Services/navigator'


// production unit ID
//const unitID = "ca-app-pub-4868408770331668/3370784165"
// Test unitID
const unitID = 'ca-app-pub-3940256099942544/6300978111'



export default class App extends React.Component {
  componentWillMount() {
    //BackHandler.addEventListener('hardwareBackPress', () => { return true });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      /**
       * Remove all notifications from the tray
       * (and therefore sets the current badge number on the app icon to 0)
       */
      firebase.notifications().removeAllDeliveredNotifications()
      firebase.notifications().cancelAllNotifications()
    }
  }

  componentDidMount = () => {
    /**
     * Keyboard oppener listener
     */
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this._keyboardDidShow()
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this._keyboardDidHide()
    });
  }

  _keyboardDidShow = () => {
    const action = { type: 'AD_BANNER', value: { value: false, event: 'keyboard' } }
    Store.dispatch(action)
  }

  _keyboardDidHide = () => {
    const action = { type: 'AD_BANNER', value: { value: true, event: 'keyboard' } }
    Store.dispatch(action)
  }

  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <AppContainer
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
          <BannerComponent unitID={unitID} />
        </PersistGate>
      </Provider>
    );
  }
}

