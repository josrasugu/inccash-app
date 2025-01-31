import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { userDetails } from "../services/authService";
const UserProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      const response = await userDetails();
      if (response.success) {
        setUserData(response);
        setLoading(false);
      } else {
        console.error("Error fetching user details:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0074D9" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.detailText}>First Name: {userData?.firstName}</Text>
        <Text style={styles.detailText}>
          Middle Name: {userData?.middleName}
        </Text>
        <Text style={styles.detailText}>Last Name: {userData?.lastName}</Text>
        <Text style={styles.detailText}>Email: {userData?.email}</Text>
        <Text style={styles.detailText}>Status: {userData?.status}</Text>
        <Text style={styles.detailText}>Balance: ${userData?.balance}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0074D9",
  },
  profileContainer: {
    marginBottom: 30,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#0074D9",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default UserProfile;
