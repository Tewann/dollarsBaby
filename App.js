import React from 'react';
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import Dimensions from 'Dimensions'

const { height, width } = Dimensions.get('window');
const heightString = Math.trunc(height).toString()
const adSize = heightString + 'x50'
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export default class App extends React.Component {
  render() {
    console.log(adSize)
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation />
          <Banner
            unitId={"ca-app-pub-3940256099942544/6300978111"}
            size={adSize}
            request={request.build()}
            onAdFailedToLoad={(e) => {
              console.log('Advert error : ' + e);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
