import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";

const PaymentConfirmation = ({ navigation }) => {
  const recipientName = "John Doe";
  const amount = 250;
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
  },
  recipient: {
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
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
