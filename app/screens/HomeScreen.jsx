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
import { MaterialIcons } from "@expo/vector-icons"; // Import icons
import { SelectList } from "react-native-dropdown-select-list";
import { exchangeRates } from "../services/transactionService";
import { TextInput, Button, Card } from "react-native-paper";
const base64America =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAMCAMAAAC+5dbKAAAAVFBMVEXsxsvjrLPMa3fRfolXVoPcl5+wUl68PEyUboljYopEQ3VdXIbUgYtUU36fQFe6p6q1mp23g5WuhYqqeoCpYHbCpbW7kqPJjJmyj5SwcoahcnhQS3iZVZQdAAAAZElEQVQY01XNVw6AMAwD0ABmlFL25v73JCqqYp7yZbmuoMV3fU1W0cwheGATMmge4FuHZ83JIlp38A7YMzLqvtaBgKsrzGz9qSSnNMnB+STpZaczvJOZ37+5IYsYNkgV9fHM/QJxQQWCpgcZfAAAAABJRU5ErkJggg==";
const base64Kenya =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAPCAMAAAA4caRkAAAAVFBMVEUAZgAAAAC7AADMPz9/sn9/f3/fiIikJSWzFRG0AAArAAAqKiqNiYm+TEfORUUpcSkOaQ4BAQEsTgCjAABBAABAAADkmZmGoYKFoIBxcXFwcHApKSlUn7UGAAAAW0lEQVQY062OSQ6AIAwAKy5AAdnc/f8/5dJ6UOLFOTSZSdMUmnc+u4llRPPsBzrcT+49YdWgLBu0hBSDkGwgiFmPemK7O+YlI1ttv3q/I9byz8YGRPDJJR/gZy5oxQRymFJhQgAAAABJRU5ErkJggg==";

const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [amountUsd, setAmount] = useState("");
  const [amountOther, setAmountOther] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCountryId, setSelected] = React.useState("");
  const [rates, setExchangeRates] = useState([]);
  const [rateOptions, setRateOptions] = useState([]);
  const [selectedCountryImg, setSelectedCountryImg] = useState("");
  const [selectedCountryCurrency, setSelectedCountryCurrency] = useState("");
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
  useEffect(() => {
    getExchangeRates();
  }, []);
  const handleSelectionChange = (val) => {
    setSelected(val);
    setAmount(0);
    setAmountOther(0);
    rates.forEach((rate) => {
      if (rate.country_id == val) {
        setSelectedCountryImg(rate.flag_icon);
        setSelectedCountryCurrency(rate.currency_code);
      }
    });
  };
  const getExchangeRates = async () => {
    // setSelectedCountryImg(base64Kenya);
    // selectedCountryCurrency("KES");
    try {
      const response = await exchangeRates();
      const rateOpts = [];
      response.data.forEach((rate) => {
        const displayText =
          rate.name +
          " ( " +
          " 1$ = " +
          rate.currency_code +
          " " +
          rate.rate +
          ".00 )";
        rateOpts.push({ key: rate.country_id, value: displayText });
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

  const handleUsdAmountChange = (value) => {
    rates.forEach((rate) => {
      if (rate.country_id == selectedCountryId) {
        setAmount(value);
        setAmountOther((parseFloat(value) * rate.rate).toFixed(2));
      }
    });
  };
  const handleOtherAmountChange = (value) => {
    rates.forEach((rate) => {
      if (rate.country_id == selectedCountryId) {
        setAmount((parseFloat(value) / rate.rate).toFixed(2));
        setAmountOther(value);
      }
    });
  };

  const gotToProfile = () => {
    navigation.navigate("Profile");
  };
  const renderItem = ({ item }) => (
    <Card style={styles.listCard}>
      <View style={styles.listRow}>
        {/* Icon on the left */}
        <MaterialIcons
          name={
            item.status === "Completed"
              ? "check-circle"
              : item.status === "Pending"
              ? "hourglass-empty"
              : "error"
          }
          size={30}
          color={
            item.status === "Completed"
              ? "green"
              : item.status === "Pending"
              ? "orange"
              : "red"
          }
        />
        {/* Transaction details */}
        <View style={styles.listDetails}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.status}</Text>
              <Text style={{ textAlign: "left", color: "gray" }}>
                {item.time}
              </Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={{ textAlign: "left", color: "gray", fontSize: 16 }}>
                {item.fullName}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
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
            inputStyles={[{ fontSize: 22 }]}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
            maxHeight={200}
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
              value={amountUsd}
              onChangeText={handleUsdAmountChange}
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
              value={amountOther}
              onChangeText={handleOtherAmountChange}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.nextButton}>
          <Button
            style={[{ width: "100%" }]}
            labelStyle={[{ fontSize: 22 }]}
            mode="outlined"
            onPress={() => navigation.navigate("Recipient")}
          >
            Next
          </Button>
        </TouchableOpacity>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
    margin: 20,
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
    paddingLeft: 10,
    fontSize: 26,
    backgroundColor: "#F9F9F9",
  },
  nextButton: {
    alignItems: "center",
    marginTop: 20,
  },
  transactionsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
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
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
  },
  selectBox: {
    backgroundColor: "#F9F9F9",
    height: 60,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 22,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
  },
  dropdown: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 5,
    fontSize: 22,
  },
  dropdownText: {
    fontSize: 22,
    color: "#000000", // Customize the text color for dropdown options
  },

  listCard: {
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listDetails: {
    marginLeft: 10,
    flex: 1,
  },
  listStatus: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listTime: {
    fontSize: 12,
    color: "gray",
  },
  listAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  listMessage: {
    fontSize: 12,
    color: "gray",
  },
});

export default HomeScreen;
