import React from 'react';
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import Dimensions from 'Dimensions'
import { SafeAreaView } from 'react-navigation'
import { Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

const { height, width } = Dimensions.get('window');
const heightString = Math.trunc(height).toString()
const adSize = heightString + 'x50'
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
const unitID = Platform.OS === 'ios' ? 'ca-app-pub-4868408770331668/3443399374' : "ca-app-pub-3940256099942544/6300978111"

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#3a485c' }} forceInset={{ top: 'never' }}>
            <Navigation />
            <Banner
              unitId={unitID}
              size={"FULL_BANNER"}
              request={request.build()}
              onAdFailedToLoad={(e) => {
                console.error('Advert error : ' + e);
              }}
            />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
