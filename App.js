import React from 'react';
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import { Keyboard, AppState } from 'react-native'
import StatusBarComponent from './src/Components/StatusBarComponent/StatusBarComponent'
import AppContainer from './src/Navigation/Navigation'
import BannerComponent from './src/Components/BannerComponent/BannerComponent'
import NavigatorService from './src/Services/navigator'

export default class App extends React.Component {
  componentWillMount() {
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
     * When the keyboard opens => calls reducer to hide the ad banner
     * When the keyboard closes => calls reducer to show the ad banner
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
        <StatusBarComponent />
          <AppContainer
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
          <BannerComponent/>
        </PersistGate>
      </Provider>
    );
  }
}

