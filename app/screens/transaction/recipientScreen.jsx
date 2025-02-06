import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { TextInput, Button, Card, List, MD3Colors } from "react-native-paper";

const SelectRecipient = () => {
  const [recipient, setRecipient] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const handleSelectionChange = (val) => {
    console.log(val);
  };
  const handleChange = (text) => {
    setRecipient(text);
  };

  const handleSubmit = () => {
    console.log("Recipient:", recipient);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <List.Section>
          <List.Item
            title="Add recipient"
            titleStyle={styles.addTitle}
            left={() => (
              <List.Icon
                color={"#000000"}
                icon="account-multiple-plus"
                style={styles.addIcon}
              />
            )}
          />
        </List.Section>
        <View style={styles.pickerSelect}>
          <SelectList
            setSelected={handleSelectionChange}
            data={searchOptions}
            save="key"
            inputStyles={[{ fontSize: 22 }]}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
            maxHeight={200}
          />
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
        {/* 
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Select Recipient</Text>
      </TouchableOpacity> */}
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  pickerSelect: {
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
    marginTop: 20,
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
  nextButton: {
    alignItems: "center",
    marginTop: 20,
  },
  addTitle: {
    fontSize: 22, // Increase the text size
    fontWeight: "bold", // Optional: makes the title bold
  },
  addIcon: {
    fontSize: 40, // Increase the icon size
  },
});

export default SelectRecipient;
