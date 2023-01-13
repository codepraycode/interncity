import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {Typography, Colors, Assets} from 'react-native-ui-lib';
import {
    Theme,
    typography,
    // assets
} from './constants';
import assets from './constants/assets';


Colors.loadColors(Theme);
Typography.loadTypographies(typography);

Assets.loadAssetsGroup('logo', {
  logo: assets.logo,
});
Assets.loadAssetsGroup('vectors', {
  memoji1: assets.memoji1,
  wave: assets.wave,
  eyeOpen: assets.eyeOpen,
  eyeClose: assets.eyeClose,
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
        <Text>Hello world!</Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
