import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, List, MD3Colors } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import * as SecureStore from "expo-secure-store";

const identificationTypes = [
  { key: "1", value: "Passport" },
  { key: "2", value: "Driver License" },
  { key: "3", value: "National ID" },
];

const countries = [
  { key: "US", value: "United States" },
  { key: "CA", value: "Canada" },
  { key: "GB", value: "United Kingdom" },
];

const AddCustomerAddress = ({ navigation }) => {
  const [customerId, setCustomerId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [name, setName] = useState("");
  const [identificationType, setIdentificationType] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [countryId, setCountryId] = useState(null);

  const handleContinue = () => {
    const formData = {
      customerId,
      businessName,
      registrationNumber,
      name,
      identificationType,
      buildingName,
      addressLine1,
      addressLine2,
      postCode,
      countryId,
    };

    // SecureStore.setItemAsync("formData", JSON.stringify(formData));
    navigation.navigate("IdentityCard");
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View>
        <TextInput
          label="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
          style={styles.input}
        />
        <TextInput
          label="Registration Number"
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
          style={styles.input}
        />
      </View> */}
      <View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <View style={styles.selectList}>
          <SelectList
            data={identificationTypes}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
            onSelect={(val) => setIdentificationType(val)}
            setSelected={setIdentificationType}
            save="value"
            label="Identification Type"
            placeholder="Select Identification Type"
          />
        </View>
      </View>
      <View>
        <TextInput
          label="Building Name"
          value={buildingName}
          onChangeText={setBuildingName}
          style={styles.input}
        />
        <TextInput
          label="Address Line 1"
          value={addressLine1}
          onChangeText={setAddressLine1}
          style={styles.input}
        />
        <TextInput
          label="Address Line 2"
          value={addressLine2}
          onChangeText={setAddressLine2}
          style={styles.input}
        />
        <TextInput
          label="Post Code"
          value={postCode}
          onChangeText={setPostCode}
          style={styles.input}
        />
        <SelectList
          data={countries}
          boxStyles={styles.selectBox}
          dropdownStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdownText}
          onSelect={(val) => setCountryId(val)}
          setSelected={setCountryId}
          save="value"
          label="Country"
          placeholder="Select Country"
        />
      </View>
      <Button mode="contained" onPress={handleContinue} style={styles.button}>
        Continue
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#F9F9F9",
  },
  button: {
    marginTop: 16,
  },
  selectList: {
    marginBottom: 15,
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
    color: "#000000",
  },
});

export default AddCustomerAddress;
