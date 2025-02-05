import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.0.113:8000";

export const exchangeRates = async () => {
  try {
    const token = SecureStore.getItem("access_token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    const response = await axios.get(`${API_URL}/api/exchange-rates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};
