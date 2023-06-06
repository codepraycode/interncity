import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function useCachedResources() {
    const [isLoaded, setIsLoaded] = useState(false);
    // const [fontsLoaded] = useFonts({
    //     FontBold: require('../assets/fonts/DMSans-Bold.ttf'),
    //     FontMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    //     FontRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    // });

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                // Load fonts
                await Font.loadAsync({
                    FontBold: require('../assets/fonts/DMSans-Bold.ttf'),
                    FontMedium: require('../assets/fonts/DMSans-Medium.ttf'),
                    FontRegular: require('../assets/fonts/DMSans-Regular.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setIsLoaded(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return { isLoaded };
}