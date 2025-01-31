import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      fullName: "John Doe",
      amount: "$100",
      time: "12:30 PM",
      status: "Completed",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      amount: "$50",
      time: "1:15 PM",
      status: "Pending",
    },
    {
      id: "3",
      fullName: "Samuel Lee",
      amount: "$200",
      time: "2:45 PM",
      status: "Completed",
    },
  ]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Implement currency conversion logic here
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const gotToProfile = () => {
    navigation.navigate("Profile");
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionRow}>
      <Text style={styles.transactionText}>{item.fullName}</Text>
      <Text style={styles.transactionText}>{item.amount}</Text>
      <Text style={styles.transactionText}>{item.time}</Text>
      <Text
        style={[
          styles.transactionText,
          item.status === "Completed" ? styles.completed : styles.pending,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Currency Selector */}
      {/* <Picker
        selectedValue={selectedCountry}
        style={styles.picker}
        onValueChange={handleCountryChange}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="INR" value="INR" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
      </Picker> */}
      <View style={styles.pickerSelect}>
        <RNPickerSelect
          onValueChange={handleCountryChange}
          items={[
            { label: "Canada (CAD)", value: "CAD" },
            { label: "European Union (EUR)", value: "EUR" },
            { label: "United Kingdom (GBP)", value: "GBP" },
            { label: "India (INR)", value: "INR" },
          ]}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount in USD"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />
        <TextInput
          style={styles.input}
          placeholder={`Amount in ${selectedCountry}`}
          editable={false}
          value={amount ? `${(parseFloat(amount) * 75).toFixed(2)}` : ""}
        />
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <Text style={styles.transactionsTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
      />

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
  picker: {
    height: 50,
    width: "100%",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "#AAD0F2",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  nextButtonText: {
    color: "#0074D9",
    fontSize: 18,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 20,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionText: {
    fontSize: 14,
  },
  completed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
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

export default HomeScreen;
