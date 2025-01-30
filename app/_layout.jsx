import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import StackNavigator from "./navigation/StackNavigator";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <Stack>
//         <Stack.Screen
//           name="index"
//           options={{ title: "Home", headerShown: false }}
//         />
//       </Stack>
//     </SafeAreaProvider>
//   );
// }
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
