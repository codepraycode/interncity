import { Slot, SplashScreen } from 'expo-router';
import { Assets, Colors, Typography } from 'react-native-ui-lib';
import { theme, typography, assets} from '../resources';
import useCachedResources from '../hooks/useCachedResources';
import { AppContextProvider } from '../context';

// Setup
Colors.loadColors({
    ...theme,
    lightSecondary: Colors.rgba(theme.secondary, 0.2),
});
Typography.loadTypographies(typography);
Assets.loadAssetsGroup('assets', {
    ...assets
});

const AppLayout = () => {
    
    const { isLoaded } = useCachedResources()


    return (
        <>
            {!isLoaded && <SplashScreen/>}
            <AppContextProvider>
                <Slot/>
            </AppContextProvider>
        </>
    )
}

export default AppLayout;