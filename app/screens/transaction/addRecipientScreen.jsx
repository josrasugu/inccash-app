import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { TextInput, Button, Card } from "react-native-paper";
import { AddBeneficiary } from "../../services/transactionService";

export default function AddRecipient({ navigation }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mpesa_no: "",
    account_name: "",
  });

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await AddBeneficiary(formData);
      if (response.success) {
        console.log("abc", response);
        navigation.navigate("Recipient");
      } else {
        console.log("abc", response);
        // setMessage(response.message);
      }
    } catch (error) {
      console.log("sef", error);
      //   setMessage(error.message);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="First Name"
          value={formData.first_name}
          onChangeText={(text) => handleInputChange("first_name", text)}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={formData.last_name}
          onChangeText={(text) => handleInputChange("last_name", text)}
          style={styles.input}
        />
        <TextInput
          label="Mpesa No."
          value={formData.mpesa_no}
          onChangeText={(text) => handleInputChange("mpesa_no", text)}
          style={styles.input}
        />
        <TextInput
          label="Mpesa Account Name--"
          value={formData.account_name}
          onChangeText={(text) => handleInputChange("account_name", text)}
          style={styles.input}
        />
        <Button
          style={[{ width: "100%" }]}
          labelStyle={[{ fontSize: 22 }]}
          mode="outlined"
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

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
  card: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
