// import { Tabs } from 'expo-router';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { display: 'none' },
//       }}
//     />
//   );
// }

import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from 'expo-router';
import EmailVerification from './EmailVerification';
import ForgotPassword from './ForgotPassword';
import LoginScreen from './LoginScreen';
import OtpVerification from './OtpVerification';
import NewPassword from './NewPassword';

const Stack = createStackNavigator();

export default function TabsLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab Screens */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}>
        {() => (
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          />
        )}
      </Stack.Screen>

      {/* Non-tab screens that need back navigation */}
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="NewPassword" component={NewPassword} />

    </Stack.Navigator>
  );
}
