import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import ReferralScreen from "../screens/referral/indexScreen";
import SelectRecipient from "../screens/transaction/recipientScreen";
import AddRecipient from "../screens/transaction/addRecipientScreen";
import PaymentDetails from "../screens/transaction/paymentDetailsScreen";
import PaymentConfirmation from "../screens/transaction/confirmationScreen";

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
      <Stack.Screen
        name="Referral"
        component={ReferralScreen}
        options={{ title: "Referral Screen", headerShown: false }}
      />
      <Stack.Screen
        name="AddRecipient"
        component={AddRecipient}
        options={{ title: "Add Recipient", headerShown: true }}
      />
      <Stack.Screen
        name="Recipient"
        component={SelectRecipient}
        options={{ title: "Select Recipient", headerShown: true }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{ title: "Confirm transfer", headerShown: true }}
      />
      <Stack.Screen
        name="PaymentConfirmation"
        component={PaymentConfirmation}
        options={{ title: "Confirm transfer", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
