import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const referralsData = [
  { id: "1", name: "John Doe", referralCode: "ABCD123" },
  { id: "2", name: "Jane Smith", referralCode: "EFGH456" },
  { id: "3", name: "Sam Johnson", referralCode: "IJKL789" },
  // Add more data as needed
];

const ReferralScreen = ({ navigation }) => {
  const renderReferralItem = ({ item }) => (
    <View style={styles.referralItem}>
      <Text style={styles.referralName}>{item.name}</Text>
      <Text style={styles.referralCode}>
        Referral Code: {item.referralCode}
      </Text>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.header}>Referral List</Text>
        <FlatList
          data={referralsData}
          renderItem={renderReferralItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  referralItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  referralName: {
    fontSize: 18,
    fontWeight: "600",
  },
  referralCode: {
    marginVertical: 5,
    color: "#666",
  },
  detailsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default ReferralScreen;
