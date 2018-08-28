import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/Services/bgMessaging'

AppRegistry.registerComponent('eBlink', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging)
