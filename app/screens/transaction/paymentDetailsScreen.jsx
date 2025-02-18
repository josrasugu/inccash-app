import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Card,
  Text,
  Title,
  Subheading,
  IconButton,
  Divider,
} from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const PaymentDetails = ({ navigation }) => {
  const [data, setData] = useState(null);
  const recipient = JSON.parse(SecureStore.getItem("recipient"));
  const rate = JSON.parse(SecureStore.getItem("exchange_rate"));
  const usdAmount = SecureStore.getItem("usd_amount");
  const otherCurrencyAmount = SecureStore.getItem("other_currency_amount");
  console.log(recipient);
  const exchangeRate = rate.rate;
  const totalCharged = "$" + usdAmount;
  const transferFee = "$2";
  const transferAmount = usdAmount;
  const totalToRecipient = "$" + (usdAmount - 2);
  const recipientFullName = recipient.first_name + " " + recipient.last_name;
  const recipientAccountNumber = recipient.mpesa_no;
  const paymentMethod = "Mpesa";

  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .post("https://your-api-endpoint.com/data", {
        /* request payload */
      })
      .then((response) => {
        setData(response.data); // Assuming response contains the necessary data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Exchange Rate */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Exchange Rate</Title>
          <Text>{exchangeRate}</Text>
        </Card.Content>
      </Card>

      {/* Section 2: Total Charges */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Charged (Paypal)</Title>
          <Text>{totalCharged}</Text>
          <Divider style={styles.divider} />
          <Subheading>Transfer Fee</Subheading>
          <Text>{transferFee}</Text>
          <Divider style={styles.divider} />
          <Subheading>Transfer Amount</Subheading>
          <Text>{transferAmount}</Text>
          <Divider style={styles.divider} />
          <Subheading>Total to Recipient</Subheading>
          <Text>{totalToRecipient}</Text>
        </Card.Content>
      </Card>

      {/* Section 3: Recipient Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Recipient Details</Title>
          <View style={styles.recipientDetails}>
            <IconButton icon="bank" size={30} onPress={() => {}} />
            <View>
              <Text>{recipientFullName}</Text>
              <Text>{recipientAccountNumber}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Section 4: Payment Method */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Payment Method</Title>
          <View style={paymentMethod}>
            <IconButton
              icon={data.paymentMethodLogo}
              size={30}
              onPress={() => {}}
            />
            <View>
              <Text>{data.paymentMethodTitle}</Text>
              <Subheading>{data.paymentMethodDescription}</Subheading>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Button
        style={{ marginBottom: 40 }}
        mode="contained"
        onPress={() => navigation.navigate("PaymentConfirmation")}
      >
        Send
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    marginVertical: 8,
  },
  recipientDetails: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
  },
});

export default PaymentDetails;
