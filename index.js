import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/Services/bgMessaging'
import codePush from 'react-native-code-push'

let codePushOptions = { 
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, 
    installMode: codePush.InstallMode.ON_NEXT_RESUME 
  }

AppRegistry.registerComponent('eBlink', () => codePush(codePushOptions)(App));
//AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging)
