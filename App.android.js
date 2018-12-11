import React from 'react';
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'
import { SafeAreaView } from 'react-navigation'

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
// correct unit ID
const unitID = "ca-app-pub-4868408770331668/3370784165"
// Test unitID
//const unitID = 'ca-app-pub-3940256099942544/6300978111'
export default class App extends React.Component {
  
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
            <Navigation />
            <Banner
              unitId={unitID}
              size={"FULL_BANNER"}
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
