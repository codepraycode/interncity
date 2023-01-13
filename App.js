import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {Typography, Colors, Assets} from 'react-native-ui-lib';

import Theme from './constants/theme';
import typography from './constants/typography';
import assets from './constants/assets';
import AppOnboard from './components/onboarding';


Colors.loadColors(Theme);
Typography.loadTypographies(typography);

console.log(assets)
Assets.loadAssetsGroup('assets', {
  ...assets
});
// Assets.loadAssetsGroup('vectors', {
//   memoji1: assets.memoji1,
//   wave: assets.wave,
//   eyeOpen: assets.eyeOpen,
//   eyeClose: assets.eyeClose,
//   arrowRight
// });

export default function App() {

    const [loaded] = useFonts({
      FontBold:require('./assets/fonts/DMSans-Bold.ttf'),
      FontMedium:require('./assets/fonts/DMSans-Medium.ttf'),
      FontRegular:require('./assets/fonts/DMSans-Regular.ttf'),
    });

    if(!loaded) return null;

    return (
      <View style={styles.container}>
        <AppOnboard/>
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
