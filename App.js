import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import {Typography, Colors, Assets} from 'react-native-ui-lib';

import Theme from './constants/theme';
import typography from './constants/typography';
import assets from './constants/assets';

import AppScreens from './features';
import { AppContextProvider } from './app/context';
import Notification from './features/Notifications';

Colors.loadColors({
      ...Theme,
      lightSecondary: Colors.rgba(Theme.secondary, 0.2),
    });
Typography.loadTypographies(typography);
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
        <AppContextProvider>
          <AppScreens/>
          <Notification/>
        </AppContextProvider>
        
        <StatusBar style="auto" />
      </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.grey100,
  },
});
