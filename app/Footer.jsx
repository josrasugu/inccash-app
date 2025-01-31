import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = ({ navigation }) => {
  const gotToProfile = () => {
    navigation.navigate("Profile");
  };
  const gotToReferral = () => {
    navigation.navigate("Referral");
  };
  const gotToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerIcon} onPress={gotToHome}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={gotToReferral}>
        <Ionicons name="people-outline" size={24} color="black" />
        <Text>Referral</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={gotToProfile}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
  },
  footerIcon: {
    alignItems: "center",
  },
  pickerSelect: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    margin: 20,
  },
});

export default Footer;
