import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, IconButton, Avatar } from "react-native-paper";

export default function AlmostReady({ navigation }) {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={150} icon="account-circle" style={styles.icon} />
      <Text variant="headlineLarge" style={styles.mainText}>
        You are almost ready to start your transactions
      </Text>
      <Text variant="bodyLarge" style={styles.subText}>
        To start your transactions, you need to complete our identity
        verification process
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AddCustomerAddress")}
      >
        Start verification
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 50,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  icon: {
    marginBottom: 30,
  },
  mainText: {
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
});
