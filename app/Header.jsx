import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Inc Cash</Text>
      <TouchableOpacity style={styles.earnButton}>
        <Text style={styles.earnButtonText}>Earn $12</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0074D9",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  earnButton: {
    backgroundColor: "#AAD0F2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  earnButtonText: {
    color: "#0074D9",
    fontSize: 16,
  },
});

export default Header;
