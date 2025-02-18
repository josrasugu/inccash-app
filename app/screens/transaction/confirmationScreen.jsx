import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
const PaymentConfirmation = ({ navigation }) => {
  const recipient = JSON.parse(SecureStore.getItem("recipient"));
  const rate = JSON.parse(SecureStore.getItem("exchange_rate"));
  const usdAmount = SecureStore.getItem("usd_amount");

  const recipientName = recipient.first_name + " " + recipient.last_name;
  const amount = "$" + (usdAmount - 2);
  const currency = "USD";

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Payment Confirmation</Title>
      <Paragraph style={styles.message}>
        Your transfer to <Text style={styles.recipient}>{recipientName}</Text>{" "}
        is being processed.
      </Paragraph>
      <View>
        <Paragraph style={styles.amount}>
          {currency} <Text style={styles.bold}>{amount}</Text>
        </Paragraph>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        OK
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    padding: 10,
  },
  recipient: {
    fontWeight: "bold",
  },
  amount: {
    fontSize: 24,
    padding: 10,
    // marginVertical: 20,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
});

export default PaymentConfirmation;
