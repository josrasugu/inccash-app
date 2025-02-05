import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { exchangeRates } from "../services/transactionService";
import { TextInput } from "react-native-paper";
const base64America =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAMCAMAAAC+5dbKAAAAVFBMVEXsxsvjrLPMa3fRfolXVoPcl5+wUl68PEyUboljYopEQ3VdXIbUgYtUU36fQFe6p6q1mp23g5WuhYqqeoCpYHbCpbW7kqPJjJmyj5SwcoahcnhQS3iZVZQdAAAAZElEQVQY01XNVw6AMAwD0ABmlFL25v73JCqqYp7yZbmuoMV3fU1W0cwheGATMmge4FuHZ83JIlp38A7YMzLqvtaBgKsrzGz9qSSnNMnB+STpZaczvJOZ37+5IYsYNkgV9fHM/QJxQQWCpgcZfAAAAABJRU5ErkJggg==";
const base64Kenya =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAPCAMAAAA4caRkAAAAVFBMVEUAZgAAAAC7AADMPz9/sn9/f3/fiIikJSWzFRG0AAArAAAqKiqNiYm+TEfORUUpcSkOaQ4BAQEsTgCjAABBAABAAADkmZmGoYKFoIBxcXFwcHApKSlUn7UGAAAAW0lEQVQY062OSQ6AIAwAKy5AAdnc/f8/5dJ6UOLFOTSZSdMUmnc+u4llRPPsBzrcT+49YdWgLBu0hBSDkGwgiFmPemK7O+YlI1ttv3q/I9byz8YGRPDJJR/gZy5oxQRymFJhQgAAAABJRU5ErkJggg==";

const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [rates, setExchangeRates] = useState([]);
  const [rateOptions, setRateOptions] = useState([]);
  const [selectedCountryImg, setSelectedCountryImg] = useState("");
  const [selectedCountryCurrency, setSelectedCountryCurrency] = useState("");
  // setSelectedCountryImg(base64Kenya);
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

  const handleSelectionChange = (val) => {
    setSelected(val);
    rates.forEach((rate) => {
      if (rate.country_id == val) {
        setSelectedCountryImg(rate.flag_icon);
        setSelectedCountryCurrency(rate.currency_code);
      }
    });
  };

  useEffect(() => {
    getExchangeRates();
  }, []);
  const getExchangeRates = async () => {
    setSelectedCountryImg(base64Kenya);
    try {
      const response = await exchangeRates();
      const rateOpts = [];
      response.data.forEach((rate) => {
        rateOpts.push({ key: rate.country_id, value: rate.name });
      });
      setRateOptions(rateOpts);
      setExchangeRates(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
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
      <View style={styles.content}>
        <View style={styles.pickerSelect}>
          <SelectList
            setSelected={handleSelectionChange}
            data={rateOptions}
            save="key"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={[styles.inputColumn, { flex: 1, marginRight: 10 }]}>
            <View style={styles.flagLabel}>
              <View style={[{ flex: 0.2 }]}>
                <Image source={{ uri: base64America }} style={styles.image} />
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[{ fontSize: 25, color: "#ccc" }]}>USD</Text>
              </View>
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="0"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>
          <View style={[styles.inputColumn, { flex: 1 }]}>
            <View style={styles.flagLabel}>
              <View style={[{ flex: 0.2 }]}>
                <Image
                  source={{
                    uri:
                      selectedCountryImg != ""
                        ? selectedCountryImg
                        : base64Kenya,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[{ fontSize: 25, color: "#ccc" }]}>
                  {selectedCountryImg != "" ? selectedCountryCurrency : "KES"}
                </Text>
              </View>
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="0"
              value={amount ? `${(parseFloat(amount) * 75).toFixed(2)}` : ""}
            />
          </View>
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
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
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
  image: {
    width: 25,
    height: 18,
  },
  picker: {
    height: 50,
    width: "100%",
    marginTop: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  flagLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputColumn: {},
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 26,
    backgroundColor: "#F9F9F9",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: 20,
  },
});

export default HomeScreen;
