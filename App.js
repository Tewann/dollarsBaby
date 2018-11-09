import React from 'react';
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import Dimensions from 'Dimensions'
import { SafeAreaView } from 'react-navigation'

const { height, width } = Dimensions.get('window');
const heightString = Math.trunc(height).toString()
const adSize = heightString + 'x50'
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#3a485c' }} forceInset={{ top: 'never' }}>
            <Navigation />
            <Banner
              unitId={"ca-app-pub-3940256099942544/6300978111"}
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
