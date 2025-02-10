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
  const recipientId = SecureStore.getItem("recipient");
  const currencyCountryId = SecureStore.getItem("currency_country");
  const usdAmount = SecureStore.getItem("usd_amount");
  const otherCurrencyAmount = SecureStore.getItem("other_currency_amount");

  const exchangeRate = "130";
  const totalChargedPaypal = "$" + usdAmount;
  const transferFee = "$2";
  const transferAmount = usdAmount;
  const totalToRecipient = "$" + (usdAmount + 2);
  const recipientFullName = "Josphat Rasugu";
  const recipientAccountNumber = "0714164793";

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
          <Text>{totalChargedPaypal}</Text>
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
          <View style={styles.paymentMethod}>
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
        mode="contained"
        onPress={() => navigation.navigate("PaymentConfirmation")}
      >
        Confirm Payment
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
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
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PaymentDetails;
