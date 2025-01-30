import React, { useState } from "react";
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Inc Cash</Text>
        <TouchableOpacity style={styles.earnButton}>
          <Text style={styles.earnButtonText}>Earn $12</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text>Refferals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={gotToProfile}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
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

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import RNPickerSelect from "react-native-picker-select";
// import axios from "axios";
// import Icon from "react-native-vector-icons/FontAwesome";

// const currencyAPI = "https://api.exchangerate-api.com/v4/latest/USD"; // Example API to fetch USD conversion rates

// const HomeScreen = ({ navigation }) => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [conversionRate, setConversionRate] = useState(null);
//   const [usdAmount, setUsdAmount] = useState("");
//   const [convertedAmount, setConvertedAmount] = useState("");
//   const [recentTransactions, setRecentTransactions] = useState([]);

//   useEffect(() => {
//     // Fetch recent transactions from local state or API
//     setRecentTransactions([
//       { id: 1, currency: "EUR", amount: 100 },
//       { id: 2, currency: "GBP", amount: 75 },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       fetchConversionRate(selectedCountry);
//     }
//   }, [selectedCountry]);

//   const fetchConversionRate = async (countryCode) => {
//     try {
//       const response = await axios.get(currencyAPI);
//       setConversionRate(response.data.rates[countryCode]);
//     } catch (error) {
//       console.error("Error fetching conversion rate: ", error);
//     }
//   };

//   const handleUsdInputChange = (text) => {
//     setUsdAmount(text);
//     if (conversionRate) {
//       setConvertedAmount((parseFloat(text) * conversionRate).toFixed(2));
//     }
//   };

//   const handleNextButton = () => {
//     console.log("Next Button Pressed");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Dropdown for country selection */}
//       <View style={styles.inputContainer}>
//         <Text>Select Country:</Text>
//         <RNPickerSelect
//           onValueChange={(value) => setSelectedCountry(value)}
//           items={[
//             { label: "Canada (CAD)", value: "CAD" },
//             { label: "European Union (EUR)", value: "EUR" },
//             { label: "United Kingdom (GBP)", value: "GBP" },
//             { label: "India (INR)", value: "INR" },
//             // Add more countries as needed
//           ]}
//         />
//       </View>

//       {/* USD to selected country currency input */}
//       <View style={styles.inputContainer}>
//         <Text>USD Amount:</Text>
//         <TextInput
//           style={styles.textInput}
//           keyboardType="numeric"
//           value={usdAmount}
//           onChangeText={handleUsdInputChange}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text>Converted Amount:</Text>
//         <TextInput
//           style={styles.textInput}
//           editable={false}
//           value={convertedAmount}
//         />
//       </View>

//       {/* Next Button */}
//       <TouchableOpacity style={styles.button} onPress={handleNextButton}>
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>

//       {/* Recent Transactions */}
//       <View style={styles.recentTransactionsContainer}>
//         <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
//         {recentTransactions.map((transaction) => (
//           <View key={transaction.id} style={styles.transactionItem}>
//             <Text>
//               {transaction.currency}: {transaction.amount}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.navBar}>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="home" size={30} color="black" />
//           <Text>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="users" size={30} color="black" />
//           <Text>Referrals</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="user" size={30} color="black" />
//           <Text>Account</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   inputContainer: {
//     marginVertical: 10,
//   },
//   textInput: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginVertical: 20,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   recentTransactionsContainer: {
//     marginVertical: 20,
//   },
//   recentTransactionsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   transactionItem: {
//     marginVertical: 5,
//   },
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     backgroundColor: "#f8f8f8",
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//   },
//   navItem: {
//     alignItems: "center",
//   },
// });

// export default HomeScreen;

// import React from "react";
// import {
//   Text,
//   View,
//   Button,
//   TextInput,
//   Pressable,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { useAuth } from "../context/AuthContext";

// const HomeScreen = ({ navigation }) => {
//   const { user, logout } = useAuth();

//   return (
//     <View style={styles.container}>
//       <Text>Welcome, {user?.email}!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#FFFFFF",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
// });

// export default HomeScreen;
