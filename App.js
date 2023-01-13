import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {Typography, Colors, Assets} from 'react-native-ui-lib';

import Theme from './constants/theme';
import typography from './constants/typography';
import assets from './constants/assets';
import CreateAccount from './features/authentication/CreateAccount';
// import AppOnboard from './features/authentication/Onboarding';
import Login from './features/authentication/Login';


Colors.loadColors(Theme);
Typography.loadTypographies(typography);

console.log(assets)
Assets.loadAssetsGroup('assets', {
  ...assets
});


export default function App() {

    const [loaded] = useFonts({
      FontBold:require('./assets/fonts/DMSans-Bold.ttf'),
      FontMedium:require('./assets/fonts/DMSans-Medium.ttf'),
      FontRegular:require('./assets/fonts/DMSans-Regular.ttf'),
    });

    if(!loaded) return null;

    return (
      <View style={styles.container}>
        {/* <AppOnboard/> */}
        {/* <Login/> */}
        <CreateAccount/>
        <StatusBar style="auto" />
      </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.grey100,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
