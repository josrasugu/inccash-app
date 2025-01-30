import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen"; // Example Home screen
import UserProfile from "../screens/UserProfile"; // Example Home screen

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register", headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inc Cash", headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfile}
        options={{ title: "User profile", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
