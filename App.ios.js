import React from 'react';
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import { SafeAreaView } from 'react-navigation'
import { Platform } from 'react-native'
import { Keyboard, AppState } from 'react-native'

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
// Correct release unitID
//const unitID = 'ca-app-pub-4868408770331668/3443399374'
// Test unitID
const unitID = 'ca-app-pub-3940256099942544/6300978111'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAds: true
    }
  }

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
     */
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this._keyboardDidShow()
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this._keyboardDidHide()
    });
  }

  _keyboardDidShow = () => {
    this.setState({ showAds: false })
  }

  _keyboardDidHide = () => {
    this.setState({ showAds: true })
  }

  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#3a485c' }} forceInset={{ top: 'never' }}>
            <Navigation />
            {this.state.showAds &&
              <Banner
                unitId={unitID}
                size={"FULL_BANNER"}
                request={request.build()}
                onAdFailedToLoad={(e) => {
                  console.log('Advert error : ' + e);
                }}
              />
            }
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
