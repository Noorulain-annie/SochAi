import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreen } from './components/SplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log('Layout effect - fonts loaded:', loaded);
    if (loaded) {
      // Hide the native splash screen
      ExpoSplashScreen.hideAsync().catch(console.error);
    }
  }, [loaded]);

  // Add error handling
  if (error) {
    console.error('Error loading fonts:', error);
  }

  if (!loaded) {
    return null;
  }

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {showSplash ? (
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      ) : (
        <>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </>
      )}
    </ThemeProvider>
  );
}