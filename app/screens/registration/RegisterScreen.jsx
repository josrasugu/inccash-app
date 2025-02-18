import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/authService";
import appLogoImg from "@/assets/images/app-logo.png";

const RegisterScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [entityType, setEntityType] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      const userDetails = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        password: password,
        phone: phone,
        role_id: 3,
        entity_type: entityType,
        active: 0,
      };
      // const response = await registerUser(userDetails);
      // setMessage(response.message);
      // setSuccess(response.success);
      // if (response.success) {
      //   Alert.alert("Account Created", response.message, [
      //     { text: "OK", onPress: () => navigation.navigate("Login") },
      //   ]);
      // }

      navigation.navigate("AlmostReady");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgSection}>
        <Image source={appLogoImg} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Account type"
        value={entityType}
        onChangeText={setEntityType}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {success !== true ? (
        <View style={styles.responseSection}>
          {message ? <Text style={styles.responseFail}>{message}</Text> : null}
        </View>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#DAECFA",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#888",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imgSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  responseSection: {
    marginBottom: 10,
    marginTop: 10,
  },
  responseSuccess: {
    color: "#00B55A",
    fontSize: 22,
  },
  responseFail: {
    color: "#FF0000",
    fontSize: 22,
  },
});

export default RegisterScreen;
