import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import {Typography, Colors, Assets} from 'react-native-ui-lib';

import Theme from './constants/theme';
import typography from './constants/typography';
import assets from './constants/assets';

import AppScreens from './features';
import { AppContextProvider } from './app/context';
import Notification from './features/Notifications';
import useStorage from './hooks/useStorage';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Colors.loadColors({
  ...Theme,
  lightSecondary: Colors.rgba(Theme.secondary, 0.2),
});

Typography.loadTypographies(typography);
Assets.loadAssetsGroup('assets', {
  ...assets
});

export default function App() {

    const [fontsLoaded] = useFonts({
      FontBold:require('./assets/fonts/DMSans-Bold.ttf'),
      FontMedium:require('./assets/fonts/DMSans-Medium.ttf'),
      FontRegular:require('./assets/fonts/DMSans-Regular.ttf'),
    });

    
    const {loading, isFresh:newlyInstalled } = useStorage();
    

    const onLayoutRootView = useCallback(async () => {
      console.log(fontsLoaded, loading)
      if (fontsLoaded && !loading) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, loading]);

    if (!fontsLoaded) return null;


    return (
      <View 
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <AppContextProvider>
          <AppScreens isFresh={newlyInstalled}/>
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
