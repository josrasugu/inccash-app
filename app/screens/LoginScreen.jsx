import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import * as SecureStore from "expo-secure-store";

import appLogoImg from "@/assets/images/app-logo.png";

export default function Index({ navigation }) {
  const data = [];
  const [todos, setTodos] = useState(data);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        await SecureStore.setItemAsync("access_token", response.access_token);
        login(response.user);
        navigation.navigate("Home");
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.message);
    }

    // In a real scenario, send `email` and `password` to your API
    // For example, using axios:
    // axios.post('your-api-url', { email, password })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, comleted: false }, ...todos]);
      setText("");
    }
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      {/* <Text style={styles.title}>Login--</Text> */}
      <View style={styles.imgSection}>
        <Image source={appLogoImg} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.responseSection}>
        {message ? <Text style={styles.responseMessage}>{message}</Text> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
    // </SafeAreaView>
  );
}

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
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imgSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  responseSection: {
    marginBottom: 10,
    marginTop: 10,
  },
  responseMessage: {
    color: "#FF0000",
    fontSize: 22,
  },
});
